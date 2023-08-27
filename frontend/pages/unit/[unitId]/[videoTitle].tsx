import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import { Container, Grid, Box, Image, Center, VStack, Text, Heading, Spacer } from '@chakra-ui/react';
import VideoHeatmap from '@/components/VideoHeatmap';

// Get topics

import file from "@/components/ExTranscript.json"
console.log(file)

const dialogueSegments = file.labels.filter(item => item.type === "dialogue-segment");
console.log(dialogueSegments);

const topicData = dialogueSegments.map(topic => ({
  name: topic.data?.subheading,
  ts: file.contents.at(topic.span[0])?.timestamp
}));

// Page

const Video: NextPage = () => {

  const router = useRouter();
  const {videoTitle} = router.query;

  return (
      <Grid templateColumns="70% 30%" gap={6} m={4}>
        <Box>
          <VideoPlayer link={'https://dkkxc50nup77a.cloudfront.net/' + videoTitle + ".mp4"} />
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
          <VStack align="start" spacing={2}>
            <Heading fontSize='2xl'>Topic</Heading>
            <Spacer/>
            {topicData.map((topic, index) => (
                <Text fontSize="sm" key={index}>{`${index + 1}. ${topic.name}`}</Text>
            ))}
          </VStack>
        </Box>
      </Grid>
  );
};

export default Video;
