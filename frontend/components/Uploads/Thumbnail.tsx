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
import {uploadFileToS3} from "@/service/s3Handler";

export default function ThumbnailComponent() {
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSaveFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const result = await uploadFileToS3(file!)
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle error cases (if needed)
        });
  }

  return (
    <div>
      <Input margin="5" width="100" placeholder="Choose File" accept="csv" type="file" onChange={handleSaveFile} />
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
