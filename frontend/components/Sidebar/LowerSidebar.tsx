import {
  Stack,
  Button,
  Divider,
  Avatar,
  Box,
  Text,
  Menu,
  MenuList,
  MenuItem,
  useColorMode,
  MenuButton,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FiHelpCircle, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { AuthContext } from '@/utils/auth';

const user = {
  image: 'https://img001.prntscr.com/file/img001/bCZkTHGYQ7G8BOqmZ8mW9Q.png',
  name: 'Barack Obama',
  email: 'barack.obama@us.gov',
};

const LowerSidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const auth = useContext(AuthContext);

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
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
            aria-label="Log out"
          >
            <Avatar size={'sm'} src={user.image} name={user.name} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => auth?.logout()}>Log Out</MenuItem>
          </MenuList>
        </Menu>
        <Box ml={3}>
          <Text fontSize={'sm'} fontWeight={'medium'}>
            {user.name}
          </Text>
          <Text fontSize={'sm'}>{user.email}</Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LowerSidebar;
