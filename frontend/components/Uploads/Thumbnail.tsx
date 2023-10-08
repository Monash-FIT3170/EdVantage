// EdVantage/frontend/components/uploadComponent.tsx
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, useDisclosure
} from '@chakra-ui/react';
import React, {ChangeEvent, useState} from 'react';
import { useAuth } from '../AuthProvider';

export default function ThumbnailComponent() {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSaveFile = () => {
    handleFileUpload()
  }

  const handleFileUpload = () => {
    // Call the S3 handler function to VideoUpload.tsx the file to S3
    console.log('Thumbnail uploaded successfully:');
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

  };

  return (
    <div>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleFileChange} />
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
