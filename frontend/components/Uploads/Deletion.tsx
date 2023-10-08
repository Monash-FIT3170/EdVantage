//Button to delete file from Bucket
import React, { ChangeEvent } from 'react';
import {MenuItem} from '@chakra-ui/react';
import {deleteFileFromS3} from '../../service/s3Handler'; // Import the S3 handler from the API directory
import exp from 'constants';

interface DeleteComponentProps {
  file: string;
}

export default function DeleteComponent({ file }: DeleteComponentProps) {
  const handleDeleteFile = ()=> {
    if(file){
      const confirmDelete = window.confirm("Are you sure you want to delete this file?")
      handleFileDelete()
    }
    else{
      alert("Please select a file first.")
    }
  }
  const handleFileDelete = () => {
    // Call the S3 handler function to VideoUpload.tsx the file to S3
    console.log("Delete")
    deleteFileFromS3(file)
      .then((response) => {
        console.log('File deleted successfully:', response);
        // Perform any additional actions after successful VideoUpload.tsx (if needed)
        alert("The file has been deleted.")
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });
  }

  return (
    <div>
      <MenuItem margin="5" width="50" placeholder="Save" color="red" onClick={handleDeleteFile}>
        Delete
      </MenuItem>
    </div>
  );
}