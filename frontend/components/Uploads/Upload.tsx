// EdVantage/frontend/components/uploadComponent.tsx
import { BASE_API_URL } from '@/utils/api-client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import axios from "axios";
import React, {ChangeEvent, useState} from 'react';
import { uploadFileToS3 } from '../../service/s3Handler';
import { VideoMetadata } from '@/utils/VideoType';
import { useAuth } from '../AuthProvider';

const WHISPER_API_URL =
  process.env.WHISPER_PUBLIC_BACKEND_URL || 'http://localhost:8000/';

var fileURL: File | undefined;

interface UploadProps {
  unit: string | null,
  title: string | null,
  description: string | null
}

export default function UploadComponent({ unit, title, description }: UploadProps) {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [thumbnail, setThumbnail] = useState<any>(null);

  const handleThumbnail = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const result = await uploadFileToS3(file!)
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle error cases (if needed)
        });

    setThumbnail(file!.name);
  }

  const handleSaveFile = () => {
    if (fileURL) {
      handleFileUpload(fileURL)
    }
    else {
      alert("Please select a file first.")
    }
  }

  const handleFileUpload = async (file: File) => {
    // Call the S3 handler function to VideoUpload.tsx the file to S3
    console.log("1")
    const result = await uploadFileToS3(file)
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error cases (if needed)
      });

    const videoData: Partial<VideoMetadata> = {
      title: title ? title : "",
      videoDescription: description ? description : "",
      unit: unit ? unit : "FIT3170",
      bucket: 'edvantage-video',
      bucketKey: file.name.split('.', 1)[0],
      videoLocation: result?.Location || '',
      videoOwner: user?.userId,
      thumbnailLink: 'https://dkkxc50nup77a.cloudfront.net/' + thumbnail
    }

    console.log('File uploaded successfully:', result);
    onOpen();
    initiateTranscription(file.name)

    // Call the API to insert the video metadata into the database
    fetch(`${BASE_API_URL}video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you might need for authentication or authorization
      },
      body: JSON.stringify(videoData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to insert video metadata');
        }
      })
      .then(data => {
        console.log('Video metadata inserted:', data);
        // Handle successful response here
      })
      .catch(error => {
        console.error('Error inserting video metadata:', error);
        // Handle error here
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
    <div>
      <Text fontSize='medium' align={"left"}>Thumbnail</Text>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleThumbnail} />

      <Text fontSize='medium' align={"left"}>Video</Text>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleFileChange} />
      <Button margin="5" width="50" placeholder="Save" onClick={handleSaveFile}>
        Save
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Video Uploaded!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Demo Video has been uploaded. Transcriptions are being generated.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
