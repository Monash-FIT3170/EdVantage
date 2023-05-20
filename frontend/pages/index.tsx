import { Container, Center, Stack } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import CustomMediaPane from '@/components/CustomMediaPane';

export default function Home() {
  return (
    <Container maxW={'container.xl'} centerContent>
      <Stack direction={'row'} alignItems={'stretch'}>
        <CustomMediaPane />
        <VideoPane />
      </Stack>
    </Container>
  );
}
