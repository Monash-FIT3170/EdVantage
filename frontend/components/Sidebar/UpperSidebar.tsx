import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FiHome, FiList, FiStar } from 'react-icons/fi';
import { BsPen } from 'react-icons/bs';

const enrolledUnits = ['FIT3170', 'FIT3077', 'MON1001', 'MON1002'];

const UpperSidebar = () => {
  return (
    <Stack spacing={6}>
      <Heading
        bgGradient={'linear(to right, #EDE342, #FF51EB)'}
        bgClip={'text'}
      >
        EdVantage
      </Heading>
      <Stack>
        <Link href={'/'} passHref>
          <Button
            variant={'ghost'}
            leftIcon={<FiHome />}
            h={10}
            w={'full'}
            justifyContent={'start'}
          >
            Home
          </Button>
        </Link>
        <Link href={'/QuizManagerPage'}>
          <Button variant={'ghost'} leftIcon={<BsPen/>} h={10} w={'full'} justifyContent={'start'}>
            Quiz Manager
          </Button>
        </Link>
      </Stack>
      <Stack>
        <Text size="xs" color={'gray.500'}>
          Units
        </Text>
        {enrolledUnits.map((unit) => {
          return (
            <Link key={unit} href={`/unit/${unit}`} passHref>
              <Button
                variant={'ghost'}
                leftIcon={<FiList />}
                h={10}
                w={'full'}
                justifyContent={'start'}
              >
                {unit}
              </Button>
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default UpperSidebar;
