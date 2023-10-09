CREATE TABLE IF NOT EXISTS video_metadata (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_description TEXT,
    unit VARCHAR(255) NOT NULL REFERENCES units(unit_code),
    bucket VARCHAR(255) NOT NULL,
    bucket_key VARCHAR(255) NOT NULL,
    video_location VARCHAR(255) NOT NULL,
    video_owner VARCHAR(50) NOT NULL,
    thumbnail_link VARCHAR(255),
    created_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    FOREIGN KEY (video_owner) REFERENCES users (user_id)
);

-- FIT3170 Videos
INSERT INTO
    video_metadata (title, video_description, unit, bucket, bucket_key, video_location, video_owner, thumbnail_link)
VALUES
    ('Agile Development Overview', 'Lecture on agile development', 'FIT3170', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-Agile-Development-Overview.png'),
    ('Semester 1 Week 8 Lecture UI/UX', 'Lecture on UI/UX', 'FIT3170', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W8-Lecture-UI-UX.jpg'),
    ('Semester 1 Week 10 Lecture Financial Consulting', 'Lecture on Financial Consulting', 'FIT3170', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W10-Lecture-Financial-Consulting.jpg'),
    ('Semester 1 Week 12 Group Presentations', 'End of semester group presentations', 'FIT3170', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W12-Group-Presentations.jpg'),
    ('AI vs Machine Learning', 'Lecture on AI vs ML', 'FIT3170', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/AI-vs-Machine-Learning.jpg');

-- FIT3077 Videos
INSERT INTO
    video_metadata (title, video_description, unit, bucket, bucket_key, video_location, video_owner, thumbnail_link)
VALUES
    ('Design Patterns: A Deep Dive', 'Lecture on design patterns', 'FIT3077', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-Design-Patterns.jpg'),
    ('Microservices Architecture', 'Lecture on Microservices', 'FIT3077', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-microservices-architecture.png'),
    ('RESTful API Design', 'Lecture on RESTful API design', 'FIT3077', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-RESTful-API-Design.jpg'),
    ('Frontend Architecture: MVC and MVVM', 'Lecture on MVC and MVVM frontend architectures', 'FIT3077', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-MVC-vs-MVP-vs-MVVM.jpg');

-- FIT3159 Videos
INSERT INTO
    video_metadata (title, video_description, unit, bucket, bucket_key, video_location, video_owner, thumbnail_link)
VALUES
    ('Magnetic Disk Lecture', 'Lecture on magnetic disks', 'FIT3159', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Hardware-Software-optimization-process.png'),
    ('Devices, Counters, Adders, Shifters, Sequential Logic', 'Lecture on devices, counters, adders, shifters and sequential logic', 'FIT3159', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Devices-Counters-Adders-Shifters-Sequential+Logic.jpg'),
    ('Concurrency and Parallelism', 'Lecture on concurrency and parallelism', 'FIT3159', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-concurrency-parallelism.jpg'),
    ('Instruction Sets and Instruction Set Design', 'Lecture on instruction sets', 'FIT3159', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Instruction-Sets-Instruction-Set-Design.jpg');

-- FIT3178 Videos
INSERT INTO
    video_metadata (title, video_description, unit, bucket, bucket_key, video_location, video_owner, thumbnail_link)
VALUES
    ('iOS Application Architecture', 'Lecture on iOS Architectures', 'FIT3178', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-ios-application-architecture.jpg'),
    ('Data Persistence', 'Lecture on data persistence', 'FIT3178', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-data-persistence.png'),
    ('Firebase Cloud Platform', 'Lecture on Firebase', 'FIT3178', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-firebase-cloud-platform.jpg'),
    ('Maps and Geolocation', 'Lecture on maps and geolocation', 'FIT3178', 'edvantage-video', '2021-05-28 15-33-27.mp4', 'https://edvantage-video.s3.ap-southeast-2.amazonaws.com/2021-05-28%2015-33-27.mp4', '923456789012345678909', 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-maps-geolocation.jpg');
