#!/bin/bash
docker volume create edvantagedb
docker build -t edvantage-postgres ../api/postgres
docker-compose -f ./docker/docker-compose-postgres.yml up -d
