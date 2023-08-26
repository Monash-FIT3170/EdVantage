CREATE TABLE IF NOT EXISTS video_metadata (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_description TEXT,
    unit VARCHAR(255) NOT NULL,
    bucket VARCHAR(255) NOT NULL,
    bucket_key VARCHAR(255) NOT NULL,
    video_location VARCHAR(255) NOT NULL,
    video_owner VARCHAR(50) NOT NULL,
    thumbnail_link VARCHAR(255),
    created_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    FOREIGN KEY (video_owner) REFERENCES users (user_id)
);