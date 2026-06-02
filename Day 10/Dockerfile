FROM ultralytics/ultralytics:latest-cpu

WORKDIR /app

ENV PIP_DISABLE_PIP_VERSION_CHECK=1

RUN pip install --default-timeout=300 --retries=5 \
    Flask==3.1.3 Werkzeug==3.1.8 pandas==2.2.3 scikit-learn==1.8.0 joblib==1.5.3

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
