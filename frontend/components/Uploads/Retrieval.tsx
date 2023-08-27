import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, Table, Thead, Tr, Tbody } from '@chakra-ui/react';
import { listFilesFromS3 } from '../../service/s3Handler'; // Import the modified listFilesFromS3 function
import DeleteComponent from "@/components/Uploads/Deletion";
export default function ListFilesComponent() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const fileList = await listFilesFromS3('images/');
      setFiles(fileList);
      console.log(fileList);
    } catch (error) {
      console.error('Error fetching file list:', error);
    }
  }

  return (
      <div>
        <Table variant='simple' width={'100%'}>
          <Thead>
            <Tr>
              <th>Video List</th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file: string, index) => (
                <Tr key={index} className="table-row">
                  <td className="table-cell" onClick={() => console.log(`Clicked on file: ${file}`)}>
                    {file}
                  </td>
                  <td className="table-cell">
                    <Menu>
                      <MenuButton as={Button} size="sm" variant="outline">
                        Options
                      </MenuButton>
                      <MenuList>
                        <DeleteComponent file={file} />
                        <MenuItem onClick={() => console.log(`Option 2 for file: ${file}`)}>
                          Option 2
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </Tr>
            ))}
          </Tbody>
        </Table>

        <style jsx>{`
        .table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
          padding: 8px 0;
        }

        .table-cell {
          flex: 1;
        }
      `}</style>
      </div>
  );
}