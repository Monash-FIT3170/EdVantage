from flask import Flask, request
import whisper

app = Flask(__name__)
model = whisper.load_model("small.en")

@app.route('/')
def hello():
    return "Hello World"

@app.route('/transcribe', methods=['POST'])
def transcribe():
    filename = request.json.get('filename')
    print("Downloading file from S3 Base Url/" + filename, flush=True)
    print("Downloaded file to " + filename, flush=True)

    result = model.transcribe('audio.mp3')
    print("Transcribed " + filename, flush=True)
    print("Pushing transcription back to S3 Base Url/" + filename + "-transcription", flush=True)

    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
