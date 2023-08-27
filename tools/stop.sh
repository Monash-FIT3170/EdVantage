#!/bin/bash
<<<<<<< HEAD
docker-compose -f ./docker/docker-compose.yml down
docker-compose -f ./docker/docker-compose-postgres.yml down
=======
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose-postgres.yml down
docker-compose -f docker/docker-compose-backend.yml down
>>>>>>> 2beb72a38f3956951eff9d71d20b937cb211fdcd

if echo $(docker volume ls) | grep -q "edvantagedb"; then
  docker volume rm edvantagedb
fi
