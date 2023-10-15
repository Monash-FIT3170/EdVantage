import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials and desired region
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  region: 'ap-southeast-2',
});

const s3 = new AWS.S3();

// Function to VideoUpload.tsx a file to an S3 bucket
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

//function to get list of files in a folder of a bucket
const listFilesFromS3 = (folderName: string): Promise<string[]> => {
  const params: AWS.S3.ListObjectsV2Request = {
    Bucket: 'edvantage-video',
    Prefix: folderName
  };

  return new Promise((resolve, reject) => {
    s3.listObjects(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        var files: string[] = [];
        data.Contents?.forEach(file => {
          files.push(file.Key || "");
        })
        resolve(files);
      }
    });
  });
}

export {uploadFileToS3, deleteFileFromS3, listFilesFromS3};