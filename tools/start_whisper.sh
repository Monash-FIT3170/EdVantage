#!/bin/bash
echo "Building Whisper Server"
docker build -t edvantage-whisper ../whisper

echo "Starting Docker Containers"
docker-compose -f ./docker/docker-compose-whisper.yml up -d
