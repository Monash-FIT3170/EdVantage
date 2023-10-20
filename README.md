# EdVantage
Educational Video Platform with a GPT Recommendation Engine

Shared Google Drive: https://drive.google.com/drive/folders/1iQphjeupXE0J5FsgBP2wPTk_dsTTGSHW

## Index

- [EdVantage](#edvantage)
  - [Index](#index)
  - [Project Description](#project-description)
    - [Main Features](#main-features)
- [Handover Documentation](#handover-documentation)
  - [Overview](#overview)
  - [Project Directory Structure](#project-directory-structure)
  - [Docker](#docker)
  - [User Authentication](#user-authentication)
  - [API Keys](#api-keys)
  - [Software Requirements](#software-requirements)
  - [Deployment](#deployment)
      - [Notes](#notes)
      - [Instructions](#instructions)
      - [Database Credentials](#database-credentials)
  - [Dependencies](#dependencies)
      - [Backend](#backend)
      - [Frontend](#frontend)
      - [Whisper](#whisper)
  - [Common Issues & Notes](#common-issues--notes)
  - [Development Tools](#development-tools)
  - [Versioning Strategy](#versioning-strategy)
  - [Pull Request Strategy](#pull-request-strategy)

## Project Description
Client: Riordan Alfredo

Description: A nursing simulation app which plays simulation videos, tracks students' locations during the simulation,
and opens quizzes about the video content.

### Main Features

* Students and teachers are authenticated to their accounts in the app.
* Students and teachers are enrolled into units
* Teachers can upload videos, create assessments and view analytics on the enrolled students
* Students can watch videos, sit assessments and get additional visualizations from videos and lectures
* Students can receive AI assistance for their assessment results as well as during videos
* Captions are automatically generated on video upload via OpenAI Whisper

# Handover Documentation

## Overview

This project is structured as a monorepo with a backend server under `/api` and a frontend server under `/frontend`. We additionally have a server under `/whisper` that hosts our OpenAI Whisper model and interface.

The **backend** component consists of 2 parts: a Postgres database and a TypeScript Express application that exposes API endpoints for the frontend to consume. This is continuously deployed on [Railway](https://railway.app/).

The **frontend** component is a TypeScript Next.js web application containing the user interface and logic for fetching from the backend. This is continuously deployed and hosted on [Amplify](https://ap-southeast-2.console.aws.amazon.com/amplify/home?region=ap-southeast-2#/).

The **whisper** component is a Python Flask server that exposes some API endpoints. In the backend, an open-source version of OpenAI Whisper is running that performs our video transcription.

## Project Directory Structure

```bash
.                           
├── api                                
│     ├── postgres            
│     │     ├── data
│     │     └── Postgres Dockerfile             
│     └── src                 
│         ├── persistence     
│         └── routes
│               ├── Auth
│               ├── Quiz
│               ├── User
│               └── Video  
├── frontend                
│     ├── components          
│     │     ├── Carousel        
│     │     ├── Login           
│     │     ├── Quiz            
│     │     │     ├── QuizCreation
│     │     │     └── Results     
│     │     ├── Sidebar         
│     │     ├── Uploads         
│     │     └── Visualization         
│     ├── pages               
│     │     ├── api
│     │     └── unit
│     ├── public
│     ├── service
│     │     └── S3 & Video Services
│     ├── styles
│     └── utils
├── tools
│     ├── docker
│     │     └── Docker-Compose Files
│     └── Start & Stop Scripts
├── whisper
│     └── Python Whisper Transcription Server

```

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

## User Authentication
OAuth is an authorization framework that enables apps to obtain limited access to user data. Using this service, users can login to the Edvantage platform if they are a verified Monash student.

Using OAuth 2.0 requires setting up credentials through Google API Console. 

1. Navigate to Credentials and create a new project. 
2. Choose a project name and the organisation (choosing monash.edu will enable access to Monash users only). 
3. Under “Create Credentials” choose “OAuth Client ID”.
4. Choose “Internal” for the User Type to limit who can login. 
5. Fill in basic project information.
6. For the “Authorised JavaScript Origins” and “Authorised Redirect URIs” sections include all the URIs for production, testing and development including port numbers. 
7. Note the Client ID and Client Secret. 

After these steps are followed, the authentication service is ready to be used in the client by updating the value of clientID in `/frontend/pages/_app.tsx`

## API Keys

We call various API's through our application, such as AWS S3 and OpenAI ChatGPT and, to do this, we need to have generated API Keys. We also need API keys implemented in our applications to securely access our backend servers.

| API Key          | Used In           | Local Development                                                                                                                                             | Production                                                                                                                                                         | Notes                                                                                                                                                                                            |
|------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AWS Key & Secret | Frontend, Whisper | ./frontend/.env.local: NEXT_PUBLIC_AWS_ACCESS_KEY, NEXT_PUBLIC_AWS_SECRET_KEY <br/><br/>./tools/docker/docker-compose-whisper: AWS_ACCESS_KEY, AWS_SECRET_KEY | ./frontend/.env.production: NEXT_PUBLIC_AWS_ACCESS_KEY, NEXT_PUBLIC_AWS_SECRET_KEY <br/><br/>./tools/docker/docker-compose-whisper: AWS_ACCESS_KEY, AWS_SECRET_KEY | An environment variable approach is suitable for whisper, however long-term the API keys should be moved out of the frontend and into the backend application.                                   |
| OpenAI API Key   | Frontend          | ./frontend/.env.local: NEXT_PUBLIC_OPENAI_API_KEY                                                                                                             | ./frontend/.env.production: NEXT_PUBLIC_OPENAI_API_KEY                                                                                                             | The API calls currently occurring in the frontend should be wrapped in backend calls that are secured by our API key, and the OpenAI key will be stored in the backend, via env vars or AWS KMS. |

## Software Requirements

This project requires the following software:

- Node.js (v18 or above)
- Docker (For building and running the project containers)
- PostgreSQL (Connectable through DBeaver or any other SQL client)
- Python (v3.8 or above, required for the Whisper component)

## Deployment
### Notes
- Accounts required for deployment (Railway, AWS)
- Production URL's
- CI/CD Builds and any notes
- Release processes

### Instructions
To deploy this project, you will need to:

1. Set up the environment variables as described in the API Keys section for local or production environments.
2. For local testing and development, use the provided Docker scripts under `/tools`.
3. For production, the project is continuously deployed via AWS CodePipeline and AWS Elastic Beanstalk for the backend and AWS Amplify for the frontend. Ensure the proper setup of these platforms and configure the CI/CD pipelines accordingly.

### Database Credentials
The default database credentials are as follows:
- Host: 127.0.0.1
- Port: 5432
- Database: edvantage
- User: admin
- Password: Password

## Dependencies

These are the descriptions and versions of our primary dependencies.

### Backend
| Package                     | Description                                       | Version  |
|-----------------------------|---------------------------------------------------|----------|
| aws-sdk                     | Provides client for AWS API's and services        | 2.1423.0 |
| cors                        | Provides CORS functionality for API calls         | 2.8.5    |
| express                     | A backend JS framework for building simple API's  | 4.18.2   |
| google-auth-library         | Used for creating OAuth functionality             | 8.8.0    |
| pg                          | Package that provides a pre-built Postgres client | 8.5.1    |

### Frontend
| Package             | Description                                            | Version  |
|---------------------|--------------------------------------------------------|----------|
| @chakra-ui/react    | React CSS styling package                              | 2.5.5    |
| @react-oauth/google | React integration with Google OAuth                    | 0.11.0   |
| aws-sdk             | Provides client for AWS API's and services             | 2.1423.0 |
| chart.js            | Statistics library used to create visualisations       | 4.4.0    |
| next                | Server-side front-end framework that extends React     | 13.3.0   |
| openai              | Package for integrating with OpenAI API's              | 4.1.0    |
| pg                  | Package that provides a pre-built Postgres client      | 8.5.1    |
| react               | All-in-one front-end framework                         | 18.2.0   |
| react-dom           | Extension to react that makes DOM easier to work with  | 18.2.0   |
| typescript          | Typed extension to the Javascript programming language | 5.0.3    |

### Whisper
| Package        | Description                                        | Version |
|----------------|----------------------------------------------------|---------|
| flask          | A lightweight backend framework for building API's | latest  |
| openai-whisper | Open-source whisper transcription model            | latest  |
| boto3          | Provides client for AWS API's and services         | latest  |
| flask_cors     | Extension to flask that fixes CORS                 | latest  |

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

## Versioning Strategy

We use [Semantic Versioning](https://semver.org/) for this project. For future releases, please adhere to this structure:

- **MAJOR** version when you make incompatible API changes,
- **MINOR** version when you add functionality in a backward-compatible manner, and
- **PATCH** version when you make backward-compatible bug fixes.

Remember to update the version in the `package.json` file as well as tag the commit with the new version.

## Pull Request Strategy

For developers intending to contribute to the project, please follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch from the 'main' branch with a descriptive name about the feature or fix.
3. Implement your changes and write clear, understandable commit messages.
4. Push your branch to your fork.
5. Open a pull request against the 'main' branch of the original repository.
6. Describe the changes in the pull request description and mention any issue(s) your PR addresses.

Please ensure your code adheres to the existing style guidelines and passes any tests. The project maintainers will review your PR and provide feedback.
