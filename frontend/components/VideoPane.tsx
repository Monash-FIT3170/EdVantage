import { useState } from 'react';
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
  Button,
  useDisclosure
} from '@chakra-ui/react';
import VideoPlayer from './VideoPlayer';
import QuizDrawer from './Quiz/QuizDrawer';
import QuizDialog from "./Quiz/QuizDialog";

const VideoPane = () => {
  const [dialogState, setDialogState] = useState(false);
  function openDialog() { setDialogState(true); }
  function closeDialog() { setDialogState(false); }

  const [drawerState, setDrawerState] = useState(false);
  function openDrawer() { setDrawerState(true); }
  function closeDrawer() { setDrawerState(false); }

  return (
    <>
      <Box maxW={'lg'} position={'sticky'} top={6}>
        <Card variant={'outline'}>
          <CardBody>
            <VideoPlayer link="https://dkkxc50nup77a.cloudfront.net/X32dce7_D48.mp4" />
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
                <Button onClick={openDialog} colorScheme="blue">
                  Quiz
                </Button>
                <QuizDialog dialogState={dialogState} closeDialog={closeDialog} openDrawer={openDrawer}/>
                <QuizDrawer id={'1'} drawerState={drawerState} closeDrawer={closeDrawer}/>
              </ButtonGroup>
            </Stack>
          </CardFooter>
        </Card>
      </Box>
    </>
  );
};

export default VideoPane;
