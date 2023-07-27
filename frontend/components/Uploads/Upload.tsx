// EdVantage/frontend/components/uploadComponent.tsx
import React, { ChangeEvent } from 'react';
import { Button, Input } from '@chakra-ui/react';
import uploadFileToS3 from '../../../api/s3Handler'; // Import the S3 handler from the API directory

export default function UploadComponent() {
  const handleFileUpload = (file: File) => {
    // Call the S3 handler function to upload the file to S3
    uploadFileToS3(file)
      .then((response) => {
        console.log('File uploaded successfully:', response);
        // Perform any additional actions after successful upload (if needed)
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Only proceed if a file is selected
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleFileChange} />
      <Button margin="5" width="50" placeholder="Save" onClick={() => {}}>
        Save
      </Button>
    </div>
  );
}
