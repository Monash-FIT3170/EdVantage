//Button to delete file from Bucket
import React, { ChangeEvent } from 'react';
import { Button, Input } from '@chakra-ui/react';
import {deleteFileFromS3} from '../s3Handler'; // Import the S3 handler from the API directory
import exp from 'constants';

var file:string | undefined;
export default function DeleteComponent() {
  const handleDeleteFile = ()=> {
    if(file){
      handleFileDelete(file)
    }
    else{
      alert("Please select a file first.")
    }
  }
  const handleFileDelete = (file: string) => {
    // Call the S3 handler function to upload the file to S3
    console.log("Delete")
    deleteFileFromS3(file)
      .then((response) => {
        console.log('File uploaded successfully:', response);
        // Perform any additional actions after successful upload (if needed)
        alert("The file has been uploaded.")
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });
  }
  const handleFile = () => {
    // change fileURL 
    file = 'edvantage-video'
    
  };

  return (
    <div>
      <Button margin="5" width="50" placeholder="Save" color="red" onClick={handleDeleteFile}>
        Delete
      </Button>
    </div>
  );
}