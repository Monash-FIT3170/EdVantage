import {
  Flex,
  Stack,
  Heading,
  Button,
  Text,
  Divider,
  Avatar,
  Box,
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
        flex={'1 1 0%'}
        maxW={{ base: 'full', sm: 'xs' }}
        px={{ base: 4, sm: 6 }}
        py={{ base: 6, sm: 8 }}
        background={'white'}
        boxShadow={'base'}
      >
        <Stack justifyContent={'space-between'} w={'fill-available'}>
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
              <Stack mt={6} direction={'row'} alignItems={'center'}>
                <Avatar name="Barack Obama" size="sm"></Avatar>
                <Box ml={3}>
                  <Text size={'sm'} fontWeight={'medium'}>
                    Barack Obama
                  </Text>
                  <Text size={'sm'}>barack.obama@us.gov</Text>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
