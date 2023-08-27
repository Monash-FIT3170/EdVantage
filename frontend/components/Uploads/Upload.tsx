// EdVantage/frontend/components/uploadComponent.tsx
import React, { ChangeEvent } from 'react';
import { Button, Input } from '@chakra-ui/react';
import {uploadFileToS3} from '../s3Handler';
import { Select } from '@chakra-ui/react'
import axios from "axios";

const WHISPER_API_URL =
    process.env.WHISPER_PUBLIC_BACKEND_URL || 'http://localhost:8000/';

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
        console.log(file.name);

        initiateTranscription(file.name)
        alert("The file has been uploaded. Transcription in progress.")
        initiateTranscription(file.name)
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });
  }


  const initiateTranscription = (filename: string) => {
    axios.post(WHISPER_API_URL + 'transcribe', { filename })
        .then((response) => {
          console.log('Transcription result:', response.data);
          // Perform actions with transcription result
        })
        .catch((error) => {
          console.error('Error initiating transcription:', error);
        });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    fileURL = event.target.files?.[0];
    // Only proceed if a file is selected

  };

  return (
    <div style={{padding: "5%"}}>
    <div >
      <Select placeholder='Select option'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
    </div>
    <div>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleFileChange} />
      <Button margin="5" width="50" placeholder="Save" onClick={handleSaveFile}>
        Save
      </Button>
    </div>
  </div>
  );
}
