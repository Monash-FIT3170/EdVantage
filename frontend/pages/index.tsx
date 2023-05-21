import { Container, Stack, Box } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import CustomMediaPane from '@/components/CustomMediaPane';

export default function Home() {
  return (
    <Container maxW={'container.xl'} centerContent>
      <Stack direction={'row'} my={6}>
        <Box>
          <Stack>
            <CustomMediaPane />
            <CustomMediaPane />
          </Stack>
        </Box>
        <Box>
          <VideoPane />
        </Box>
      </Stack>
    </Container>
  );
}
