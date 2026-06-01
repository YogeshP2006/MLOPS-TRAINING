import argparse
import csv
import json
import shutil
from collections import Counter
from pathlib import Path

import cv2
from sklearn.model_selection import train_test_split
from ultralytics import YOLO


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
VIDEO_EXTENSIONS = {".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm"}
PERSON_CLASS_ID = 0
CROWD_CLASSES = ["Low", "Medium", "High"]


def find_images(folder):
    return sorted(
        path
        for path in folder.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def find_video_frame_folders(frames_dir):
    return sorted(path for path in frames_dir.iterdir() if path.is_dir())


def crowd_level_from_people_count(people_count, low_max=3, medium_max=10):
    if people_count <= low_max:
        return "Low"
    if people_count <= medium_max:
        return "Medium"
    return "High"


def count_people(result):
    if result.boxes is None or result.boxes.cls is None:
        return 0

    class_ids = result.boxes.cls.cpu().numpy().astype(int)
    return int((class_ids == PERSON_CLASS_ID).sum())


def copy_with_unique_name(image_path, output_dir):
    output_dir.mkdir(parents=True, exist_ok=True)
    new_name = f"{image_path.parent.name}_{image_path.name}"
    shutil.copy2(image_path, output_dir / new_name)


def copy_with_unique_name_and_index(image_path, output_dir, index):
    output_dir.mkdir(parents=True, exist_ok=True)
    new_name = f"{image_path.parent.name}_{image_path.stem}_{index:04d}{image_path.suffix}"
    shutil.copy2(image_path, output_dir / new_name)


def sample_images(images, max_images):
    if not max_images or len(images) <= max_images:
        return images

    step = max(len(images) // max_images, 1)
    return images[::step][:max_images]


def auto_label_frames(
    frames_dir,
    output_dir,
    detector_model,
    conf,
    image_size,
    low_max,
    medium_max,
    max_images_per_video,
):
    detector = YOLO(detector_model)
    labels_csv = output_dir / "frame_auto_labels.csv"
    labeled_images = {label: [] for label in CROWD_CLASSES}

    output_dir.mkdir(parents=True, exist_ok=True)
    with labels_csv.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["source_folder", "frame_name", "people_count", "crowd_level"],
        )
        writer.writeheader()

        total_processed = 0
        for frame_folder in find_video_frame_folders(frames_dir):
            images = sample_images(find_images(frame_folder), max_images_per_video)

            for image_path in images:
                results = detector.predict(
                    source=str(image_path),
                    imgsz=image_size,
                    conf=conf,
                    classes=[PERSON_CLASS_ID],
                    verbose=False,
                )
                people_count = count_people(results[0])
                crowd_level = crowd_level_from_people_count(
                    people_count=people_count,
                    low_max=low_max,
                    medium_max=medium_max,
                )
                labeled_images[crowd_level].append(image_path)
                writer.writerow(
                    {
                        "source_folder": frame_folder.name,
                        "frame_name": image_path.name,
                        "people_count": people_count,
                        "crowd_level": crowd_level,
                    }
                )

                total_processed += 1
                if total_processed % 100 == 0:
                    print(f"Auto-labeled {total_processed} frames")

    print(f"Saved auto labels: {labels_csv}")
    for label in CROWD_CLASSES:
        print(f"{label}: {len(labeled_images[label])} frames")

    return labeled_images


def prepare_yolo_classification_dataset(
    frames_dir,
    output_dir,
    detector_model="yolo26n.pt",
    conf=0.30,
    image_size=640,
    low_max=3,
    medium_max=10,
    max_images_per_video=300,
    test_size=0.2,
    random_state=42,
):
    if output_dir.exists():
        shutil.rmtree(output_dir)

    labeled_images = auto_label_frames(
        frames_dir=frames_dir,
        output_dir=output_dir,
        detector_model=detector_model,
        conf=conf,
        image_size=image_size,
        low_max=low_max,
        medium_max=medium_max,
        max_images_per_video=max_images_per_video,
    )

    copied_count = 0
    for label, images in labeled_images.items():
        if len(images) < 2:
            print(f"Warning: skipping {label}; only {len(images)} image(s) available")
            continue

        train_images, val_images = train_test_split(
            images,
            test_size=test_size,
            random_state=random_state,
            shuffle=True,
        )

        for image_path in train_images:
            copy_with_unique_name(image_path, output_dir / "train" / label)
        for image_path in val_images:
            copy_with_unique_name(image_path, output_dir / "val" / label)

        copied_count += len(train_images) + len(val_images)

    print(f"Prepared YOLO classification dataset: {output_dir}")
    print(f"Copied {copied_count} images")


def load_labeled_images_from_json(frames_dir, labels_json, max_images_per_class):
    data = json.loads(labels_json.read_text(encoding="utf-8"))
    labeled_images = {label: [] for label in CROWD_CLASSES}

    for row in data.get("labels", []):
        label = row.get("crowd_level")
        if label not in labeled_images:
            continue

        image_path = frames_dir / row["image_path"]
        if image_path.exists():
            labeled_images[label].append(image_path)

    for label, images in labeled_images.items():
        labeled_images[label] = sample_images(images, max_images_per_class)

    print(f"Loaded JSON labels: {labels_json}")
    for label in CROWD_CLASSES:
        print(f"{label}: {len(labeled_images[label])} frames")

    return labeled_images


def prepare_yolo_classification_dataset_from_json(
    frames_dir,
    labels_json,
    output_dir,
    max_images_per_class=500,
    min_train_images_per_class=150,
    test_size=0.2,
    random_state=42,
):
    if output_dir.exists():
        shutil.rmtree(output_dir)

    labeled_images = load_labeled_images_from_json(
        frames_dir=frames_dir,
        labels_json=labels_json,
        max_images_per_class=max_images_per_class,
    )

    copied_count = 0
    for label, images in labeled_images.items():
        if len(images) < 2:
            print(f"Warning: skipping {label}; only {len(images)} image(s) available")
            continue

        train_images, val_images = train_test_split(
            images,
            test_size=test_size,
            random_state=random_state,
            shuffle=True,
        )

        for image_path in train_images:
            copy_with_unique_name(image_path, output_dir / "train" / label)
        for image_path in val_images:
            copy_with_unique_name(image_path, output_dir / "val" / label)

        copied_count += len(train_images) + len(val_images)

        if train_images and len(train_images) < min_train_images_per_class:
            repeats_needed = min_train_images_per_class - len(train_images)
            for index in range(repeats_needed):
                image_path = train_images[index % len(train_images)]
                copy_with_unique_name_and_index(
                    image_path,
                    output_dir / "train" / label,
                    index,
                )
            copied_count += repeats_needed
            print(
                f"Oversampled {label} train images from {len(train_images)} "
                f"to {min_train_images_per_class}"
            )

    print(f"Prepared YOLO classification dataset from JSON: {output_dir}")
    print(f"Copied {copied_count} images")


def train_crowd_model(data_dir, model_name, epochs, image_size, batch, project, run_name):
    model = YOLO(model_name)
    results = model.train(
        data=str(data_dir),
        epochs=epochs,
        imgsz=image_size,
        batch=batch,
        project=project,
        name=run_name,
    )
    return results


def predict_video_crowd_level(
    video_path,
    model_path,
    image_size=640,
    sample_every_seconds=1.0,
):
    model = YOLO(model_path)
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise ValueError(f"Cannot open video: {video_path}")

    source_fps = cap.get(cv2.CAP_PROP_FPS) or 25
    sample_step = max(int(source_fps * sample_every_seconds), 1)

    frame_index = 0
    predictions = []

    while True:
        success, frame = cap.read()
        if not success:
            break

        if frame_index % sample_step == 0:
            results = model.predict(source=frame, imgsz=image_size, verbose=False)
            top1 = int(results[0].probs.top1)
            predictions.append(model.names[top1])

        frame_index += 1

    cap.release()

    if not predictions:
        raise ValueError("No frames were processed from the video.")

    counts = Counter(predictions)
    crowd_level = counts.most_common(1)[0][0]
    confidence = round((counts[crowd_level] / len(predictions)) * 100, 2)

    return {
        "crowd_level": crowd_level,
        "confidence_percent": confidence,
        "processed_frames": len(predictions),
        "class_votes": dict(counts),
    }


def main():
    parser = argparse.ArgumentParser(
        description=(
            "YOLO26 crowd analysis model training for extracted video frames. "
            "Reference style: YOLO26_model.ipynb uses YOLO(...).train() and YOLO(...).predict()."
        )
    )
    parser.add_argument(
        "--frames-dir",
        default="video_frames",
        help="Folder containing extracted frames, for example video_frames/video_01/frame_000000.jpg",
    )
    parser.add_argument(
        "--prepared-dir",
        default="datasets/yolo26_crowd_classification",
        help="Output folder for YOLO classification dataset",
    )
    parser.add_argument(
        "--labels-json",
        default="datasets/video_frame_crowd_labels.json",
        help="JSON frame labels created by label_video_frames_crowd_json.py",
    )
    parser.add_argument(
        "--detector-model",
        default="yolo26n.pt",
        help="YOLO detection model used to auto-label frames by person count",
    )
    parser.add_argument(
        "--classifier-model",
        default="yolo26n-cls.pt",
        help="YOLO classification model used for training",
    )
    parser.add_argument("--epochs", type=int, default=30, help="Training epochs")
    parser.add_argument("--imgsz", type=int, default=640, help="YOLO image size")
    parser.add_argument("--batch", type=int, default=16, help="Training batch size")
    parser.add_argument("--conf", type=float, default=0.30, help="Person detection confidence")
    parser.add_argument("--low-max", type=int, default=3, help="0..low-max people is Low")
    parser.add_argument(
        "--medium-max",
        type=int,
        default=10,
        help="low-max+1..medium-max people is Medium; above is High",
    )
    parser.add_argument(
        "--max-images-per-video",
        type=int,
        default=300,
        help="Maximum sampled frames per video folder",
    )
    parser.add_argument(
        "--max-images-per-class",
        type=int,
        default=500,
        help="Maximum images per crowd class when training from JSON labels",
    )
    parser.add_argument(
        "--min-train-images-per-class",
        type=int,
        default=150,
        help="Oversample train split until each class has at least this many images",
    )
    parser.add_argument("--project", default="runs/classify", help="YOLO output project folder")
    parser.add_argument("--name", default="yolo26_crowd_level", help="YOLO training run name")
    parser.add_argument(
        "--prepare-only",
        action="store_true",
        help="Only prepare the dataset, do not train",
    )
    parser.add_argument(
        "--auto-label",
        action="store_true",
        help="Ignore labels JSON and auto-label frames again using person detection",
    )
    parser.add_argument(
        "--predict-video",
        help="Optional video path to test a trained crowd classifier",
    )
    parser.add_argument(
        "--trained-model",
        default="runs/classify/runs/classify/yolo26_crowd_level/weights/best.pt",
        help="Trained model path used with --predict-video",
    )
    args = parser.parse_args()

    if args.predict_video:
        result = predict_video_crowd_level(
            video_path=Path(args.predict_video),
            model_path=args.trained_model,
            image_size=args.imgsz,
        )
        print(result)
        return

    frames_dir = Path(args.frames_dir)
    prepared_dir = Path(args.prepared_dir)
    labels_json = Path(args.labels_json)

    if not frames_dir.exists():
        raise FileNotFoundError(f"Frames folder not found: {frames_dir}")

    if labels_json.exists() and not args.auto_label:
        prepare_yolo_classification_dataset_from_json(
            frames_dir=frames_dir,
            labels_json=labels_json,
            output_dir=prepared_dir,
            max_images_per_class=args.max_images_per_class,
            min_train_images_per_class=args.min_train_images_per_class,
        )
    else:
        prepare_yolo_classification_dataset(
            frames_dir=frames_dir,
            output_dir=prepared_dir,
            detector_model=args.detector_model,
            conf=args.conf,
            image_size=args.imgsz,
            low_max=args.low_max,
            medium_max=args.medium_max,
            max_images_per_video=args.max_images_per_video,
        )

    if args.prepare_only:
        return

    train_crowd_model(
        data_dir=prepared_dir,
        model_name=args.classifier_model,
        epochs=args.epochs,
        image_size=args.imgsz,
        batch=args.batch,
        project=args.project,
        run_name=args.name,
    )


if __name__ == "__main__":
    main()
