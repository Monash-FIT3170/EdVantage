// EdVantage/frontend/components/uploadComponent.tsx
import React, { ChangeEvent } from 'react';
import { Button, Input } from '@chakra-ui/react';
import uploadFileToS3 from '../s3Handler'; // Import the S3 handler from the API directory

var fileURL:File | undefined;
export default function UploadComponent() {
  const handleSaveFile = ()=> {
    if(fileURL){
      handleFileUpload(fileURL)
    }
    else{
      alert("Please select a file first.")
    }
  }
  const handleFileUpload = (file: File) => {
    // Call the S3 handler function to upload the file to S3
    console.log("1")
    uploadFileToS3(file)
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    fileURL = event.target.files?.[0];
    // Only proceed if a file is selected
    
  };

  return (
    <div>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleFileChange} />
      <Button margin="5" width="50" placeholder="Save" onClick={handleSaveFile}>
        Save
      </Button>
    </div>
  );
}
