import { AuthContext } from '@/components/AuthProvider';
import { useContext } from 'react';
import { AllRoles, UserRole } from '@/utils/types';
import { Container, Stack, Box, Heading, Text } from '@chakra-ui/react';
import VideoPane from '@/components/VideoPane';
import MediaPane from '@/components/MediaPane';
import type { MediaSource } from '@/utils/types';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';

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

  const auth = useContext(AuthContext);
  const router = useRouter()

  const studentView = (
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
          <VideoPane link="https://dkkxc50nup77a.cloudfront.net/X32dce7_D48.mp4" />
        </Box>
      </Stack>
    </Container>
  )

  const teacherView = (
    <Container maxW={'container.xl'} centerContent>
      <Heading as="h1" fontSize={{ base: '5xl', lg: '6xl' }}>
        Welcome Teacher!
      </Heading>
      <Text fontSize={'larger'}>
        This is the teacher home page view.
      </Text>
    </Container>
  )

  const adminView = (
    <Container maxW={'container.xl'} centerContent>
      <Heading as="h1" fontSize={{ base: '5xl', lg: '6xl' }}>
        Welcome Admin!
      </Heading>
      <Text fontSize={'larger'}>
        This is the admin home page view.
      </Text>
    </Container>
  )

  // const View = () => {
  switch (auth?.user?.role) {
    case UserRole.Student:
      return studentView;
    case UserRole.Teacher:
      return teacherView;
    case UserRole.Admin:
      return adminView;
    // }


    // return (
    //   <ProtectedRoute allowedRoles={AllRoles}>
    //     <View />
    //   </ProtectedRoute>
    // )
  }

}
