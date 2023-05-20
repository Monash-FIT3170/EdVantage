#!/bin/bash
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose-postgres.yml down
docker-compose -f docker/docker-compose-backend.yml down

if echo $(docker volume ls) | grep -q "edvantagedb"; then
  docker volume rm edvantagedb
fi
