import ProtectedRoute from '@/components/ProtectedRoute';
import { AllRoles } from '@/utils/types';
import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';
import { Container, Stack, Box } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import MediaPane from '@/components/MediaPane';
import type { MediaSource } from '@/utils/types';

const mediaOne: MediaSource[] = [
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/3.jpg',
    alt: 'Question about a scary looking limit posted by Pierre Mounir',
  },
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/1.png',
    alt: 'Solve a!b! = a! + b! + c!',
  },
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/2.jpg',
    alt: 'A factorials question where the reader must solve for n',
  },
];

const mediaTwo: MediaSource[] = [
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/4.png',
    alt: 'Representation of a factorial in a tree form',
  },
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/5.png',
    alt: "Graph comparing the Gamma function to discrete factorial values in the context of Stirling's approximation",
  },
  {
    src: 'https://dkkxc50nup77a.cloudfront.net/images/X32dce7_D48/6.png',
    alt: 'https://www.desmos.com/calculator/seukyrudt9',
  },
];


const UnitPage: NextPage = () => {

  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoPaneRef = useRef<HTMLVideoElement>(null);

  return (
    <ProtectedRoute allowedRoles={AllRoles}>
      <Container maxW={'container.xl'} centerContent>
        <Stack direction={'row'} my={6}>
          <Box>
            <VideoPane
              ref={videoPaneRef}
              link="https://dkkxc50nup77a.cloudfront.net/videos/AI-vs-Machine-Learning.mp4"
              vttLink="https://dkkxc50nup77a.cloudfront.net/captions/AI-vs-Machine-Learning.vtt"
              onTimeUpdate={(time: number) => setCurrentTime(time)}
            />
          </Box>
          <Box>
            <Stack>
              <MediaPane
                title="Interesting Graphs"
                type={'image'}
                media={mediaTwo}
              />
              <MediaPane
                title="Discussion Questions"
                type={'image'}
                media={mediaOne}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ProtectedRoute>
  );
};

export default UnitPage;
