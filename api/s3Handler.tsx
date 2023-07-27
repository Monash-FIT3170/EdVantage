import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials and desired region
AWS.config.update({
    accessKeyId: 'AKIATPT5BS65AUCQGSVP',
    secretAccessKey: 'qfXQ9YutmpbyVR0Yn8RQ4wmxDHRvf1SQVw7K/Qu9',
    region: 'ap-southeast-2',
  });

  const s3 = new AWS.S3();

// Function to upload a file to an S3 bucket
const uploadFileToS3 = (file) => {
  const params = {
    Bucket: 'edvantage-video',
    Key: file.name,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export default uploadFileToS3;