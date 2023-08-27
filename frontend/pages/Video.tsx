import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import { Container, Grid, Box, Image, Center } from '@chakra-ui/react';
import VideoHeatmap from '@/components/VideoHeatmap';

// Get topics

import file from "../components/ExTranscript.json"
console.log(file)

const dialogueSegments = file.labels.filter(item => item.type === "dialogue-segment");
console.log(dialogueSegments);

// Page

const Video: NextPage = () => {
    
    const router = useRouter();

    return (
        <Grid templateColumns="70% 30%" gap={6} m={4}>
            <Box>
                <VideoPlayer link={''} />
            </Box>

            <Box>
                <Image src="image.jpg" alt="Description" />
            </Box>

            <Box>
                <Center>
                    <VideoHeatmap />
                </Center>
            </Box>

            <Box>
                <Image src="image.jpg" alt="Description" />
            </Box>
        </Grid>
    );
};
  
export default Video;