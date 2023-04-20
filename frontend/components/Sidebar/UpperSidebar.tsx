import { Stack, Heading, Button, Text } from '@chakra-ui/react';
import { FiHome, FiStar, FiList } from 'react-icons/fi';

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
        <Button
          variant={'ghost'}
          leftIcon={<FiHome />}
          h={10}
          minW={10}
          justifyContent={'start'}
        >
          Home
        </Button>
        <Button
          variant={'ghost'}
          leftIcon={<FiStar />}
          h={10}
          minW={10}
          justifyContent={'start'}
        >
          Favourites
        </Button>
      </Stack>
      <Stack>
        <Text size="xs" color={'gray.500'}>
          Units
        </Text>
        {enrolledUnits.map((unit) => {
          return (
            <Button
              key={unit}
              variant={'ghost'}
              leftIcon={<FiList />}
              h={10}
              minW={10}
              justifyContent={'start'}
            >
              {unit}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default UpperSidebar;
