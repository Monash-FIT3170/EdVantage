# EdVantage
Educational Video Platform with a GPT Recommendation Engine

Shared Google Drive: https://drive.google.com/drive/folders/1iQphjeupXE0J5FsgBP2wPTk_dsTTGSHW

## Project Description
Client: Riordan Alfredo

Description: Automated Query Engine integrated with ChatGPT to query for more in depth explanation or examples when students are stuck on some concepts when watching an educational video. 
* Students can ask for recommendations from the video (or a “recommend me” button, if automation is too advanced)
*  There should be a system to extract recent conversation in the video (within 5-10 seconds before & after the pause) -> query it to GPT-3, and return an explanation/examples/summary to promote self-regulated learning
*  Students need to create a video platform, where teachers can add videos/contents, see some analytics, and students can view and learn.

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