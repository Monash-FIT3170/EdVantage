import { Flex, Stack } from '@chakra-ui/react';
import UpperSidebar from './UpperSidebar';
import LowerSidebar from './LowerSidebar';

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
        maxW={{ base: 'full', sm: '2xs' }}
        px={{ base: 4, sm: 6 }}
        py={{ base: 6, sm: 8 }}
        background={'white'}
        boxShadow={'base'}
      >
        <Stack justifyContent={'space-between'} w={'fill-available'}>
          <UpperSidebar />
          <LowerSidebar />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
