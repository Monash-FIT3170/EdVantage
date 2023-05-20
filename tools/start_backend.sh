#!/bin/bash
echo "Building Postgres DB"
docker volume create edvantagedb
docker build -t edvantage-postgres ../api/postgres

echo "Building EdVantage Backend"
docker build -t edvantage-backend ../api

echo "Starting Docker Containers"
docker-compose -f ./docker/docker-compose-backend.yml up -d
