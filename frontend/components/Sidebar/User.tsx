import { useContext } from 'react';
import {
  Stack,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Text,
} from '@chakra-ui/react';
import { AuthContext } from '@/utils/auth';

const User = () => {
  const auth = useContext(AuthContext);
  const { name, email, picture } = auth?.user || {};

  return (
    <Stack
      mt={6}
      mb={0}
      direction={'row'}
      alignItems={'center'}
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
          <Avatar size={'sm'} src={picture} name={name} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => auth?.logout()}>Log Out</MenuItem>
        </MenuList>
      </Menu>
      <Box ml={3}>
        <Text fontSize={'sm'} fontWeight={'medium'}>
          {name || ''}
        </Text>
        <Text fontSize={'sm'}>
          {email && email.length > 20
            ? email.substring(0, 20) + '...'
            : email
            ? email
            : ''}
        </Text>
      </Box>
    </Stack>
  );
};

export default User;
