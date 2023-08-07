import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials and desired region
AWS.config.update({
  accessKeyId: 'AKIATPT5BS65E64KVRDV',
  secretAccessKey: 'vX7QPkrL4TwHujb3n8xCwjoGA4rXMgdbBDpEz+ny',
  region: 'ap-southeast-2',
});

const s3 = new AWS.S3();

// Function to upload a file to an S3 bucket
const uploadFileToS3 = (file: File): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'edvantage-video',
    Key: file.name,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//function to delete a file from an S3 bucket
const deleteFileFromS3 = (fileName: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'edvantage-video',
    Key: fileName
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err: Error) => {
      if (err) {
        reject(err);
      }
    });
  });
}

export {uploadFileToS3, deleteFileFromS3};