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


def convertTimestamp(timestamp: float):
    output = ""

    rounded_timestamp = round(timestamp, 2)
    timestamp_segments = [int(x) for x in str(rounded_timestamp).split('.')]

    # Appending seconds
    output += str(timestamp_segments[0] // 3600).zfill(2) + ':'
    output += str((timestamp_segments[0] % 3600) // 60).zfill(2) + ':'
    output += str((timestamp_segments[0] % 3600) % 60).zfill(2) + '.'

    # Appending milliseconds
    output += str(timestamp_segments[1])[::-1].zfill(3)[::-1]

    return output


def buildVttFile(transcription_result):
    vtt_file = "WEBVTT\n"

    for segment in transcription_result["segments"]:
        vtt_file += convertTimestamp(float(segment["start"])) + " --> " + convertTimestamp(float(segment["end"])) + '\n'
        vtt_file += segment["text"].lstrip(' ') + '\n\n'

    return vtt_file


@app.route('/')
def hello():
    return "Hello World"


@app.route('/transcribe', methods=['POST'])
def transcribe():
    filename = request.json.get('filename').split('.')
    video_fn = filename[0] + "-video." + filename[1]
    transcription_fn = filename[0] + '-transcription.vtt'

    print("Downloading file from S3 Base Url/" + ".".join(filename), flush=True)
    s3.Bucket(s3_bucket).download_file(".".join(filename), video_fn)
    print("Downloaded file to " + video_fn, flush=True)

    result = model.transcribe(video_fn)
    print("Transcribed " + video_fn, flush=True)
    print("Pushing transcription back to S3 Base Url/" + transcription_fn, flush=True)
    transcription = open(transcription_fn,"w+")
    transcription.write(buildVttFile(result))
    transcription.close()
    s3.Bucket(s3_bucket).upload_file(transcription_fn, transcription_fn)

    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
