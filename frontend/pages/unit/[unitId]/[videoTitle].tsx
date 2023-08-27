import ProtectedRoute from '@/components/ProtectedRoute';
import { AllRoles } from '@/utils/types';
import React, { useState, useRef } from 'react';
import type { NextPage } from 'next';
import { Container, Stack, Box } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import VisualizationPane from '@/components/Visualization/VisualizationPane';


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
              <VisualizationPane currentTime={currentTime} />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ProtectedRoute>
  );
};

export default UnitPage;
