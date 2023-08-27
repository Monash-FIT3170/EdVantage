# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Install ffmpeg on container for whisper package
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
RUN pip install -r requirements.txt

# DO NOT REMOVE: Stops docker from re-installing packages on each build
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
CMD ["python", "server.py"]
