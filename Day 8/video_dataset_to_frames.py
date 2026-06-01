import argparse
from pathlib import Path

import cv2


VIDEO_EXTENSIONS = {".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm"}


def safe_name(name):
    return "".join(char if char.isalnum() or char in ("-", "_") else "_" for char in name)


def find_videos(input_dir):
    return sorted(
        path
        for path in input_dir.rglob("*")
        if path.is_file() and path.suffix.lower() in VIDEO_EXTENSIONS
    )


def extract_frames(video_path, output_root, folder_name, target_fps=10, resize_to=(1280, 720)):
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        print(f"Skipping {video_path.name}: cannot open video")
        return 0

    source_fps = cap.get(cv2.CAP_PROP_FPS)
    if source_fps <= 0:
        source_fps = target_fps

    output_dir = output_root / folder_name
    output_dir.mkdir(parents=True, exist_ok=True)

    frame_interval = max(source_fps / target_fps, 1)
    next_frame_to_save = 0
    source_frame_index = 0
    saved_count = 0

    while True:
        success, frame = cap.read()
        if not success:
            break

        if source_frame_index >= next_frame_to_save:
            if resize_to:
                frame = cv2.resize(frame, resize_to)

            image_name = f"frame_{saved_count:06d}.jpg"
            cv2.imwrite(str(output_dir / image_name), frame)

            saved_count += 1
            next_frame_to_save += frame_interval

        source_frame_index += 1

    cap.release()
    print(f"{video_path.name} -> {folder_name}: {saved_count} frames saved")
    return saved_count


def main():
    parser = argparse.ArgumentParser(
        description="Convert a video dataset into image frames at 10 frames per second."
    )
    parser.add_argument("--input", default="video dataset", help="Input video folder")
    parser.add_argument("--output", default="video_frames", help="Output image folder")
    parser.add_argument("--fps", type=int, default=10, help="Frames to save per second")
    parser.add_argument("--width", type=int, default=1280, help="Output image width")
    parser.add_argument("--height", type=int, default=720, help="Output image height")
    args = parser.parse_args()

    input_dir = Path(args.input)
    output_root = Path(args.output)

    if not input_dir.exists():
        raise FileNotFoundError(f"Input folder not found: {input_dir}")

    videos = find_videos(input_dir)
    if not videos:
        print(f"No videos found in {input_dir}")
        return

    output_root.mkdir(parents=True, exist_ok=True)
    resize_to = (args.width, args.height)

    total_frames = 0
    for index, video_path in enumerate(videos, start=1):
        total_frames += extract_frames(
            video_path=video_path,
            output_root=output_root,
            folder_name=f"video_{index:02d}",
            target_fps=args.fps,
            resize_to=resize_to,
        )

    print(f"Done: {total_frames} frames extracted from {len(videos)} videos.")


if __name__ == "__main__":
    main()
