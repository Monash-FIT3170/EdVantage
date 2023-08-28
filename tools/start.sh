#!/bin/bash
echo "Building Postgres DB"
docker volume create edvantagedb
docker build -t edvantage-postgres ../api/postgres

echo "Building EdVantage Backend"
docker build -t edvantage-backend ../api

echo "Building EdVantage Frontend"
docker build -t edvantage-frontend ../frontend

echo "Run start_whisper to start whisper server"

echo "Starting Docker Containers"
docker-compose -f ./docker/docker-compose.yml up -d
