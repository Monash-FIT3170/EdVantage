import React, { useState, forwardRef, useEffect, MutableRefObject } from 'react';
import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button
} from '@chakra-ui/react';
import VideoPlayer from './VideoPlayer';
import QuizDrawer from './Quiz/QuizDrawer';
import QuizOpenDialog from "./Quiz/QuizOpenDialog";
import QuizSubmitDialog from './Quiz/QuizSubmissionDialog';

type VideoPaneProps = {
  link: string;
  vttLink?: string;  // Optional subtitle link
  onTimeUpdate?: (time: number) => void;
};

const VideoPane = forwardRef<HTMLVideoElement, VideoPaneProps>((props, ref) => {
  useEffect(() => {
    const video = ref as MutableRefObject<HTMLVideoElement>;
    const handleTimeUpdate = () => {
      if (props.onTimeUpdate) {
        props.onTimeUpdate(video?.current?.currentTime ?? 0);
      }
    };
    video?.current?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video?.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [ref, props]);
  const [startDialogState, setStartDialogState] = useState(false);
  function openStartDialog() { setStartDialogState(true); }
  function closeStartDialog() { setStartDialogState(false); }

  const [drawerState, setDrawerState] = useState(false);
  function openDrawer() { setDrawerState(true); }
  function closeDrawer() { setDrawerState(false); }

  const [submitDialogState, setSubmitDialogState] = useState(false);
  function openSubmitDialog() { setSubmitDialogState(true); }
  function closeSubmitDialog() { setSubmitDialogState(false); }

  return (
    <>
      <Box maxW={'2xl'} position={'sticky'} top={6}>
        <Card variant={'outline'}>
          <CardBody>
            <VideoPlayer link={props.link} vttLink={props.vttLink} videoRef={ref} />
            <Stack mt="6" spacing="3">
              <Heading size="lg">Why is 0! = 1?</Heading>
              <Text>© Eddie Woo. All rights reserved.</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Stack spacing="3">
              <Heading size="lg">Transcript</Heading>
              <Text>
                Why 0! equals to 1? Okay. Because it does seem to defy the idea of
                you multiply down until you get down to whatever one, and then you
                stop.
              </Text>
              <ButtonGroup spacing="2">
                <Button variant="outline" colorScheme="blue">
                  Comment
                </Button>
                <Button onClick={openStartDialog} colorScheme="blue">
                  Quiz
                </Button>
                <QuizOpenDialog dialogState={startDialogState} closeDialog={closeStartDialog} openDrawer={openDrawer} />
                <QuizDrawer id={'1'} drawerState={drawerState} closeDrawer={closeDrawer} openDialog={openSubmitDialog} />
                <QuizSubmitDialog dialogState={submitDialogState} closeDialog={closeSubmitDialog} closeDrawer={closeDrawer} />
              </ButtonGroup>
            </Stack>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
});

VideoPane.displayName = "VideoPane"; // <-- Add this line
export default VideoPane;
