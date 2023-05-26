import UnitCard from '@/components/VideoCard';
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FiBookOpen, FiLink, FiMail } from 'react-icons/fi';

const videos = [
  {
    heading:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed tellus et libero lacinia laoreet sit amet eget lorem. Quisque cursus auctor lorem nec malesuada. ',
  },
  {
    heading:
      'In nec sapien sem. Praesent blandit tristique ex consequat aliquam. Vivamus vitae risus laoreet, pellentesque nunc quis, iaculis tellus.',
  },
  {
    heading:
      'Integer diam quam, blandit sit amet tortor eu, interdum fringilla dolor.',
  },
  {
    heading:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ',
  },
];

const UnitPage: NextPage = () => {
  const router = useRouter();
  const { unitId } = router.query;

  return (
    <Container maxW={'container.xl'} mt={6} centerContent>
      <Stack maxH={'sm'} w={'full'} p={6} spacing={3} alignItems={'center'}>
        <Heading fontSize={'6xl'}>{unitId?.toString().toUpperCase()}</Heading>
        <Text fontSize={'larger'}>
          Software engineering: Architecture and design
        </Text>
        <Stack direction={'row'} spacing={3}>
          <Button variant={'ghost'} leftIcon={<FiMail />}>
            Unit Email
          </Button>
          <Button variant={'ghost'} leftIcon={<FiLink />}>
            Moodle
          </Button>
          <Button variant={'ghost'} leftIcon={<FiBookOpen />}>
            Assessments
          </Button>
        </Stack>
        <Divider />
      </Stack>
      <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={6}>
        {videos.map(({ heading }) => (
          <UnitCard key={heading} heading={heading} />
        ))}
      </Flex>
    </Container>
  );
};

export default UnitPage;
