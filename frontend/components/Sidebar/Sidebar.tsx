import { Flex, Show, Stack, useColorModeValue } from '@chakra-ui/react';
import LowerSidebar from './LowerSidebar';
import UpperSidebar from './UpperSidebar';

const Sidebar = () => {
  return (
    <Show above="lg">
      <Flex
        as="aside"
        h={'100vh'}
        position={'sticky'}
        top={0}
        background={useColorModeValue('gray.50', 'gray.700')}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        borderRadius={'sm'}
        boxShadow={useColorModeValue('base', 'dark-lg')}
      >
        <Flex
          flex={'1 1 0%'}
          maxW={{ base: 'full', sm: '2xs' }}
          px={{ base: 4, sm: 6 }}
          py={{ base: 6, sm: 8 }}
        >
          <Stack justifyContent={'space-between'} w={'fill-available'}>
            <UpperSidebar />
            <LowerSidebar />
          </Stack>
        </Flex>
      </Flex>
    </Show>
  );
};

export default Sidebar;
