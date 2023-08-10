//Button to delete file from Bucket
import React, { ChangeEvent } from 'react';
import { Button, Input } from '@chakra-ui/react';
import {deleteFileFromS3} from '../s3Handler'; // Import the S3 handler from the API directory
import exp from 'constants';

var file:string | undefined;
export default function DeleteComponent() {
  const [file, setFile] = React.useState<string>(""); 
  const handleDeleteFile = ()=> {
    if(file){
      const confirmDelete = window.confirm("Are you sure you want to delete this file?")
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
        console.log('File deleted successfully:', response);
        // Perform any additional actions after successful upload (if needed)
        alert("The file has been deleted.")
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.value); // Update the selected file when input changes
    
  };

  return (
    <div>
      <Input
        placeholder='Enter File Name'
        value={file}
        onChange={handleInputChange}
      />
      <Button margin="5" width="50" placeholder="Save" color="red" onClick={handleDeleteFile}>
        Delete
      </Button>
    </div>
  );
}