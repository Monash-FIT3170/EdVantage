#!/bin/bash
docker-compose -f docker/docker-compose-whisper.yml down

if echo $(docker volume ls) | grep -q "edvantagedb"; then
  docker volume rm edvantagedb
fi
