import VideoHeatmap from '@/components/VideoHeatmap';
import VideoPlayer from '@/components/VideoPlayer';
import {
  Box,
  Center,
  Grid,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

// Get topics

import ChatAssistant from '@/components/ChatAssistant';
import file from '@/components/ExTranscript.json';

const dialogueSegments = file.labels.filter(
  (item) => item.type === 'dialogue-segment'
);

const topicData = dialogueSegments.map((topic) => ({
  name: topic.data?.subheading,
  ts: file.contents.at(topic.span[0])?.timestamp,
}));

// Page

const Video: NextPage = () => {
  const router = useRouter();
  const { videoTitle } = router.query;

  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoPaneRef = useRef<HTMLVideoElement>(null);

  return (
    <Grid templateColumns="70% 30%" gap={6} m={4}>
      <Box>
        <VideoPlayer
          videoRef={videoPaneRef}
          link={'https://dkkxc50nup77a.cloudfront.net/' + videoTitle + '.mp4'}
        />
      </Box>

      <Box>
        <ChatAssistant />
      </Box>

      <Box>
        <VStack align="start" spacing={2}>
          <Heading fontSize="3xl">Video Name</Heading>
          <Text>This is the description of the video</Text>
          <Spacer />
        </VStack>
        <Center>
          <Box width="80%" maxHeight="420px" overflowY="scroll">
            <VStack>
              <VideoHeatmap />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/RAID_50_scheme.svg"
                alt="Description"
              />
            </VStack>
          </Box>
        </Center>
      </Box>

      <Box>
        <VStack align="start" spacing={2}>
          <Heading fontSize="2xl">Topic</Heading>
          <Spacer />
          {topicData.map((topic, index) => (
            <Text fontSize="sm" key={index}>{`${index + 1}. ${
              topic.name
            }`}</Text>
          ))}
        </VStack>
      </Box>
    </Grid>
  );
};

export default Video;
