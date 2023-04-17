import {
  Flex,
  Stack,
  Heading,
  Button,
  Text,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import {
  FiHome,
  FiStar,
  FiList,
  FiSettings,
  FiHelpCircle,
} from 'react-icons/fi';

const enrolledUnits = ['FIT3170', 'FIT3077', 'MON1001', 'MON1002'];

const Sidebar = () => {
  return (
    <Flex
      as="section"
      minH={'100vh'}
      background={'gray.50'}
      borderStyle={'solid'}
      borderColor={'gray.200'}
    >
      <Flex
        maxW={'xs'}
        px={{ base: 4, sm: 6 }}
        py={{ base: 6, sm: 8 }}
        background={'white'}
        boxShadow={'sm'}
      >
        <Stack justifyContent={'space-between'}>
          <Stack>
            <Heading>EdVantage</Heading>
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
            <Stack mt={8}>
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

          <Stack>
            <Stack mt={8}>
              <Button
                variant={'ghost'}
                leftIcon={<FiHelpCircle />}
                h={10}
                minW={10}
                justifyContent={'start'}
              >
                Help
              </Button>
              <Button
                variant={'ghost'}
                leftIcon={<FiSettings />}
                h={10}
                minW={10}
                justifyContent={'start'}
              >
                Settings
              </Button>
              <Divider />
              <Stack mt={6} dir={'row'}>
                <Avatar name="Barack Obama" size="md"></Avatar>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
