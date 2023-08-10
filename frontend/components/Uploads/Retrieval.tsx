import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { listFilesFromS3 } from '../s3Handler'; // Import the modified listFilesFromS3 function

export default function ListFilesComponent() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const fileList = await listFilesFromS3('images/');
      setFiles(fileList);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  }

  return (
    <div>
      {files.map((file, index) => (
        <Button
          key={index}
          //make the button span the length of the card
          width="100%"
          //make the button purple
          colorScheme="purple"
          // add a margin between each button
            margin="2"
          onClick={() => console.log(`Clicked on file: ${file}`)}
          id = {file}
        >
          {file}
        </Button>
      ))}
    </div>
  );
}