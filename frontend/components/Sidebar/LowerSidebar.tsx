import { Stack, Button, Divider, useColorMode } from '@chakra-ui/react';
import { FiHelpCircle, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import User from './User';

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

      <User />
    </Stack>
  );
};

export default LowerSidebar;
