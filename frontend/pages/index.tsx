import { Container, Stack, Box } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import MediaPane from '@/components/MediaPane';
import type { MediaSource } from '@/utils/types';
import { useState } from 'react';
import QuizCreationPage from '@/pages/QuizCreationPage';
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

export default function Home() {
  const [page, setPage] = useState('home');
  return (
    <div>
      {page === 'home' ? (
        <Container maxW={'container.xl'} centerContent>
          <Stack direction={'row'} my={6}>
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
            <Box>
              <VideoPane />
            </Box>
          </Stack>
        </Container>
      ) : null}
      {page === 'quiz_creation_page' ? <QuizCreationPage /> : null}
    </div>
  );
}
