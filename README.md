# EdVantage
Educational Video Platform with a GPT Recommendation Engine

Shared Google Drive: https://drive.google.com/drive/folders/1iQphjeupXE0J5FsgBP2wPTk_dsTTGSHW

## Index

- [EdVantage](#edvantage)
  - [Index](#index)
  - [Project Description](#project-description)
    - [Main Features](#main-features)
    - [Additional Features](#additional-features)
- [Handover Documentation](#handover-documentation)
  - [Overview](#overview)
  - [Docker](#docker)
  - [API Keys](#api-keys)
  - [Deployment Notes](#deployment-notes)
  - [Application Flow](#application-flow)
  - [Common Issues & Notes](#common-issues--notes)
  - [Development Tools](#development-tools)

## Project Description
Client: Riordan Alfredo

Description: A nursing simulation app which plays simulation videos, tracks students' locations during the simulation,
and opens quizzes about the video content.

### Main Features

* Students and teachers are authenticated to their accounts in the app.

* Nursing simulation videos are provided by the client and played on the app.

* The students' locations are tracked during the simulation video.

* There is a popup quiz throughout the video with questions the teacher/s have written.

* Teachers can see the students' answers to the quizzes.

### Additional Features

* ChatGPT integration to generate more questions about the simulation videos.

* ChatGPT integration to recommend certain simulation videos.

# Handover Documentation

## Overview

This project is structured as a monorepo with a backend server under `/api` and a frontend server under `/frontend`. We additionally have a server under `/whisper` that hosts our OpenAI Whisper model and interface.

The **backend** component consists of 2 parts: a Postgres database and a TypeScript Express application that exposes API endpoints for the frontend to consume. This is continuously deployed on [Railway](https://railway.app/).

The **frontend** component is a TypeScript Next.js web application containing the user interface and logic for fetching from the backend. This is continuously deployed and hosted on [Amplify](https://ap-southeast-2.console.aws.amazon.com/amplify/home?region=ap-southeast-2#/).

The **whisper** component is a Python Flask server that exposes some API endpoints. In the backend, an open-source version of OpenAI Whisper is running that performs our video transcription.

## Docker

**Prerequisite**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

The easiest way to begin development is to run the shell scripts under `/tools` which will setup Docker containers that run components of the project. Dockerfiles and docker-compose files have been configured for each of our services so that environment variables are configurable and the services integrate with each other locally by default.

| Script                                          | Services                                                    |
|-------------------------------------------------|-------------------------------------------------------------|
| [`/start.sh`](tools/start.sh)                   | Starts all 3 primary components: Database, API and Frontend |
| [`/start_backend.sh`](tools/start_backend.sh)   | Starts backend components: Database and API                 |
| [`/start_database.sh`](tools/start_database.sh) | Starts only the database                                    |
| [`/stop.sh`](tools/stop.sh)                     | Stops any component started by the scripts above            |
| [`/restart.sh`](tools/restart.sh)               | Runs stop.sh and then start.sh for quick restarting         |
| [`/start_whisper.sh`](tools/start_whisper.sh)   | Starts the Whisper backend server (separated due to size)   |
| [`/stop_whiser.sh`](tools/stop_whisper.sh)      | Stops the Whisper backend server                            |

## API Keys

We call various API's through our application, such as AWS S3 and OpenAI ChatGPT and, to do this, we need to have generated API Keys. We also need API keys implemented in our applications to securely access our backend servers.

| API Key          | Used In           | Local Development                                                                                                                                             | Production                                                                                                                                                         | Notes                                                                                                                                                                                            |
|------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS Key & Secret | Frontend, Whisper | ./frontend/.env.local: NEXT_PUBLIC_AWS_ACCESS_KEY, NEXT_PUBLIC_AWS_SECRET_KEY <br/><br/>./tools/docker/docker-compose-whisper: AWS_ACCESS_KEY, AWS_SECRET_KEY | ./frontend/.env.production: NEXT_PUBLIC_AWS_ACCESS_KEY, NEXT_PUBLIC_AWS_SECRET_KEY <br/><br/>./tools/docker/docker-compose-whisper: AWS_ACCESS_KEY, AWS_SECRET_KEY | An environment variable approach is suitable for whisper, however long-term the API keys should be moved out of the frontend and into the backend application.                                   |
| OpenAI API Key   | Frontend          | ./frontend/.env.local: NEXT_PUBLIC_OPENAI_API_KEY                                                                                                             | ./frontend/.env.production: NEXT_PUBLIC_OPENAI_API_KEY                                                                                                             | The API calls currently occurring in the frontend should be wrapped in backend calls that are secured by our API key, and the OpenAI key will be stored in the backend, via env vars or AWS KMS. |

## Deployment Notes

- Accounts required for deployment (Railway, AWS)
- Production URL's
- CI/CD Builds and any notes
- Release processes

## Application Flow
A description of the user flows in our application and how this is represented in our code, as well as our code paradigms.

TO-DO: Milestone 4

## Common Issues & Notes
A list of common issues encountered during development and ways to get around them, as well as useful documentation.

1. Logging locations for troubleshooting
   1. Frontend logs - Will generally appear in the browser console, will appear in the frontend docker container on a major error that crashes the application
   2. Backend logs - Will appear in the backend docker container, check here first if receiving an error when calling an internal API endpoint
   3. Postgres logs - Will appear in the postgres docker container, check here if performing an action that interacts with the database and fails unexpectedly
   4. Whisper logs - Will appear in the whisper docker container, check here when transcription is failing
2. "frozen-lockfile" issue - When building the frontend container, an error will come up like "failed to solve process" or something about the yarn lockfile
   1. Solution - Remove the "--frozen-lockfile" section from line 12 of frontend/Dockerfile, and move the semicolon to the end of "yarn"

## Development Tools

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - Required for local development
- [Postman](https://www.postman.com/) - Useful for sending REST requests to your backend servers without the need for frontend integration
- [DBeaver](https://dbeaver.io/) - Useful for connecting to our Postgres database and interacting with/modifying the data