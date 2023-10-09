import {NextPage} from "next";
import {Container, Heading, Input, Select, Spacer, Stack, Text} from "@chakra-ui/react";
import React, { useState } from 'react';
import {useRouter} from "next/router";
import UploadComponent from "@/components/Uploads/Upload";
import ThumbnailComponent from "@/components/Uploads/Thumbnail";

const units = ["FIT3170", "FIT3077", "FIT3159", "FIT3178"];

const VideoUpload: NextPage = () => {
  const router = useRouter();

  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  return (
      <Container maxW={'container.xl'} mt={6} centerContent>
        <Stack spacing={3} alignItems={'center'}>
          <Heading fontSize='5xl'>Upload a Video</Heading>

          <Spacer/>

          <Select
              placeholder="Select unit"
              value={selectedUnit || undefined}
              onChange={(e) => setSelectedUnit(e.target.value)}  // Update state on selection change
          >
            {units.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
            ))}
          </Select>

          <Spacer>
            <Text fontSize='medium' align={"left"}>Title</Text>
            <Input placeholder='Add a title...' />
          </Spacer>

          <Spacer>
            <Text fontSize='medium' align={"left"}>Description</Text>
            <Input placeholder='Add a description...' />
          </Spacer>

          <Spacer>
            <Text fontSize='medium' align={"left"}>Thumbnail</Text>
            <ThumbnailComponent/>
          </Spacer>

          <Spacer>
            <Text fontSize='medium' align={"left"}>Video</Text>
            <UploadComponent unit={selectedUnit}/>
          </Spacer>
        </Stack>
      </Container>
  )
}

export default VideoUpload;