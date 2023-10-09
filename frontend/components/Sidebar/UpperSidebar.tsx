import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FiHome, FiList, FiStar } from 'react-icons/fi';
import { BsPen } from 'react-icons/bs';
import { useUser } from '../UserProvider';

const enrolledUnits = ['FIT3170', 'FIT3077', 'FIT3159', 'FIT3178'];

const UpperSidebar = () => {
  const { units } = useUser()

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
      </Stack>
      <Stack>
        {
          units && units.length > 0 &&
          <>
            <Text size="xs" color={'gray.500'}>
              Units
            </Text>
            {units?.map((unit) => {
              return (
                <Link key={unit.unitCode} href={`/unit/${unit.unitCode}`} passHref>
                  <Button
                    variant={'ghost'}
                    leftIcon={<FiList />}
                    h={10}
                    w={'full'}
                    justifyContent={'start'}
                  >
                    {unit.unitCode}
                  </Button>
                </Link>
              );
            })}
          </>
        }
      </Stack>
    </Stack>
  );
};

export default UpperSidebar;
