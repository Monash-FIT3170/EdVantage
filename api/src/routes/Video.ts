import { Router } from "express";
import PostgresClient from "../persistence/PostgresClient";

export type VideoMetadata = {
  id: string;
  title: string;
  videoDescription: string;
  unit: string;
  bucket: string;
  bucketKey: string;
  videoLocation: string;
  videoOwner: string;
  thumbnailLink: string;
  createdTimestamp: Date;
}


// write the routes for uploading video metadata to postgresql(POST /video) and getting all video metadata (GET /video)

const videoRouter = Router();
const postgresClient = new PostgresClient();


videoRouter.post('/video', async (req, res) => {
  // should check auth

  const videoData: Partial<VideoMetadata> = req.body;

  // SQL query to insert data
  const insertQuery = `
    INSERT INTO video_metadata 
        (title, video_description, unit, bucket, bucket_key, video_location, video_owner, thumbnail_link)
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;
  `;

  // should check if owner is valid

  // Execute the query
  const result = await postgresClient.getPool().query(insertQuery, [
    videoData.title,
    videoData.videoDescription,
    videoData.unit,
    'edvantage-video',
    videoData.bucketKey,
    videoData.videoLocation,
    videoData.videoOwner,
    videoData.thumbnailLink
  ]).catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })

  if (!result) return;

  if (result.rowCount === 0) {
    res.status(400).send('Failed to insert video metadata');
    return;
  }

  res.status(200).send(result.rows[0]);
})

videoRouter.patch('/video/:id', async (req, res) => {
  // Should check auth

  const videoId = req.params.id;
  const updatedVideoData: Partial<VideoMetadata> = req.body;

  const updateColumns = Object.keys(updatedVideoData)
    .map((key, index) => `${camelToSnake(key)} = $${index + 1}`)
    .join(', ');

  const updateValues = Object.values(updatedVideoData);

  // SQL query to update data
  const updateQuery = `
    UPDATE video_metadata
    SET ${updateColumns}
    WHERE id = $${updateValues.length + 1};
  `;

  updateValues.push(videoId);

  // Execute the query
  const result = await postgresClient.getPool().query(updateQuery, updateValues).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });

  if (!result) return;

  if (result.rowCount === 0) {
    res.status(400).send('Failed to update video metadata');
    return;
  }

  res.status(200).send('Video metadata updated successfully');
});

videoRouter.get('/video/unit/:unit_id', async (req, res) => {
  const unitId = req.params.unit_id.toUpperCase();

  const videoResp = await postgresClient.query(
      `SELECT * FROM video_metadata WHERE unit = $1`,
      [unitId]
  );

  res.status(200).send(videoResp);
})

videoRouter.get('/video/:video_id', async (req, res) => {
  const video_id = req.params.video_id;

  const videoResp = await postgresClient.query(
      `SELECT * FROM video_metadata WHERE id = $1`,
      [video_id]
  );

  res.status(200).send(videoResp);
})

function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter: string, index: number) => (index === 0 ? letter.toLowerCase() : `_${letter.toLowerCase()}`));
}

export { videoRouter }