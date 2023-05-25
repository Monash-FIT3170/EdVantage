import {
  Button,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FiBookOpen, FiLink, FiMail } from 'react-icons/fi';

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
    </Container>
  );
};

export default UnitPage;
