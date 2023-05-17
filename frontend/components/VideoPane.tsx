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
} from '@chakra-ui/react';
import VideoPlayer from './VideoPlayer';
import QuizDrawerButton from './Quiz/QuizDrawerButton';

const VideoPane = () => {
  return (
    <Box maxW={'lg'}>
      <Card my={6} variant={'outline'}>
        <CardBody>
          <VideoPlayer link="https://dkkxc50nup77a.cloudfront.net/laughing.mp4" />
          <Stack mt="6" spacing="3">
            <Heading size="lg">MON0001 Video Lecture</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Stack spacing="3">
            <Heading size="lg">Transcript</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <ButtonGroup spacing="2">
              <Button variant="outline" colorScheme="blue">
                Comment
              </Button>
              <QuizDrawerButton id={'1'} />
            </ButtonGroup>
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default VideoPane;
