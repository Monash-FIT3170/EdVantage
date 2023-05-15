import {
  Stack,
  Button,
  Divider,
  Avatar,
  Box,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FiHelpCircle, FiSettings, FiSun, FiMoon } from 'react-icons/fi';

const LowerSidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <Stack spacing={6}>
      <Stack>
        <Button
          onClick={toggleColorMode}
          variant={'ghost'}
          leftIcon={isDarkMode ? <FiSun /> : <FiMoon />}
          h={10}
          minW={10}
          justifyContent={'start'}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
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
      </Stack>
      <Divider />
      <Stack
        mt={6}
        mb={0}
        direction={'row'}
        alignItems={'center'}
        paddingInlineStart={2}
        marginInline={0}
      >
        <Avatar
          src="https://img001.prntscr.com/file/img001/bCZkTHGYQ7G8BOqmZ8mW9Q.png"
          name="Barack Obama"
          size="sm"
        />
        <Box ml={3}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            Barack Obama
          </Text>
          <Text fontSize={'sm'}>barack.obama@us.gov</Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LowerSidebar;
