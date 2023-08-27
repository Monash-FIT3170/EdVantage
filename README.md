# EdVantage
Educational Video Platform with a GPT Recommendation Engine

Shared Google Drive: https://drive.google.com/drive/folders/1iQphjeupXE0J5FsgBP2wPTk_dsTTGSHW

## Index

- [EdVantage](#edvantage)
  - [Index](#index)
  - [Project Description](#project-description)
    - [Main Features](#main-features)
    - [Additional Features](#additional-features)
- [Developer Setup](#developer-setup)
  - [Overview](#overview)
  - [Docker](#docker)

## Project Description
Client: Riordan Alfredo

Description: A nursing simulation app which plays simulation videos, tracks students' locations during the simulation,
and opens quizzes about the video content.

<<<<<<< HEAD
## Basic Requirements
- Build a platform to upload and view videos
- Query the text before and after the pause to find related topics 
- Display them to the student neatly 
- Analytics to for teachers to understand which topics needed the most help

## How to run locally
Docker is required to run the application locally due to the requirement for a Postgres DB

- To spin up the full-stack application (frontend, backend, database), run the tools/start.sh script
- To only spin up the database, run the tools/start_database.sh script
- To stop all running containers, run the tools/stop.sh script
- To apply changes and restart the containers, run the tools/restart.sh script

Once running, logs for each part of the app can be seen in docker desktop. Bootstrap data is added to the database via sql scripts in '~/api/postgres/data'. Additionally, data can be added to the local database while it is running using a tool like DBeaver

The frontend and backend can also be run individually
- Backend: Ensure the database is running, navigate to the api folder and run "npm run dev"
- Frontend: Navigate to the frontend folder and run "npm run dev". The backend needs to be running locally to populate data or you can overwrite .env.development to point to the railway app and access production data
=======
### Main Features

* Students and teachers are authenticated to their accounts in the app.

* Nursing simulation videos are provided by the client and played on the app.

* The students' locations are tracked during the simulation video.

* There is a popup quiz throughout the video with questions the teacher/s have written.

* Teachers can see the students' answers to the quizzes.

### Additional Features

* ChatGPT integration to generate more questions about the simulation videos.

* ChatGPT integration to recommend certain simulation videos.

# Developer Setup

## Overview

This project is structured as a monorepo with a backend component under `/api` and a frontend component under `/frontend`.

The **backend** component consists of 2 parts: a Postgres database and an Express application that exposes API endpoints for the frontend to consume. This is continuously deployed on [Railway](https://railway.app/).

The **frontend** component is a Next.js web application containing the user interface and logic for fetching from the backend. This is continuously deployed and hosted on [Amplify](https://ap-southeast-2.console.aws.amazon.com/amplify/home?region=ap-southeast-2#/).

## Docker

**Prerequisite**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

The easiest way to begin development is to run the shell scripts under `/tools` which will setup Docker containers that run components of the project.

| Script | Services |
| --- | --- |
| [`/start.sh`](tools/start.sh) | Starts all 3 components: database, API and frontend |
| [`/start_backend.sh`](tools/start_backend.sh) | Starts backend components: database and API |
| [`/start_database.sh`](tools/start_database.sh) | Starts only the database |
| [`/stop.sh`](tools/stop.sh) | Stops any component started by the scripts above |
>>>>>>> 2beb72a38f3956951eff9d71d20b937cb211fdcd
