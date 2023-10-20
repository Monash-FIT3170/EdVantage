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
import React, {useEffect, useRef, useState} from 'react';

import ChatAssistant from '@/components/ChatAssistant';
import file from '@/components/ExTranscript.json';
import ApiClient from "@/utils/api-client";

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
  const [videoData, setVideoData] = useState<any>(null);
  const videoPaneRef = useRef<HTMLVideoElement>(null);

  useEffect((): void => {
    const apiClient = new ApiClient();

    if (router.isReady) {
      // Get video metadata
      apiClient
          .get(`video/${videoTitle}`)
          .then((res) => res.json())
          .then((data) => {
            setVideoData(data[0]);
          })
          .catch((err) => console.error(err));
    }
  }, [router.isReady])

  return (
        <>
          {videoData &&
              (<Grid templateColumns="70% 30%" gap={6} m={4}>
                <Box>
                  <VideoPlayer
                      videoRef={videoPaneRef}
                      link={'https://dkkxc50nup77a.cloudfront.net/' + videoData.bucket_key + '.mp4'}
                      vttLink={'https://dkkxc50nup77a.cloudfront.net/' + videoData.bucket_key + '-transcription.vtt'}
                  />
                </Box>

                <Box>
                  <ChatAssistant/>
                </Box>

                <Box>
                  <VStack align="start" spacing={2}>
                    <Heading fontSize="3xl">{videoData.title}</Heading>
                    <Text>{videoData.description}</Text>
                    <Spacer/>
                  </VStack>
                  <Center>
                    <Box width="80%" maxHeight="420px" overflowY="scroll">
                      <VStack>
                        <VideoHeatmap/>
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
                    <Spacer/>
                    {topicData.map((topic, index) => (
                        <Text fontSize="sm" key={index}>{`${index + 1}. ${
                            topic.name
                        }`}</Text>
                    ))}
                  </VStack>
                </Box>
              </Grid>)
          }
        </>
  );
};

export default Video;
