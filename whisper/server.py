from flask import Flask, request
from flask_cors import CORS
import whisper
import os
import boto3

env_var = os.environ
app = Flask(__name__)
CORS(app)
model = whisper.load_model("small.en")

s3 = boto3.resource('s3', aws_access_key_id=env_var['AWS_ACCESS_KEY'], aws_secret_access_key=env_var['AWS_SECRET_KEY'])
s3_bucket = 'edvantage-video'

@app.route('/')
def hello():
    return "Hello World"

@app.route('/transcribe', methods=['POST'])
def transcribe():
    filename = request.json.get('filename').split('.')
    video_fn = filename[0] + "-video." + filename[1]
    transcription_fn = filename[0] + '-transcription.txt'

    print("Downloading file from S3 Base Url/" + ".".join(filename), flush=True)
    s3.Bucket(s3_bucket).download_file(".".join(filename), video_fn)
    print("Downloaded file to " + video_fn, flush=True)

    result = model.transcribe(video_fn)
    print("Transcribed " + video_fn, flush=True)
    print("Pushing transcription back to S3 Base Url/" + transcription_fn, flush=True)
    transcription = open(transcription_fn,"w+")
    transcription.write(str(result))
    transcription.close()
    s3.Bucket(s3_bucket).upload_file(transcription_fn, transcription_fn)

    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
