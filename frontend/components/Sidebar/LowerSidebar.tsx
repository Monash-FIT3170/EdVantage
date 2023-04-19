import { Stack, Button, Divider, Avatar, Box, Text } from '@chakra-ui/react';
import { FiHelpCircle, FiSettings } from 'react-icons/fi';

const LowerSidebar = () => {
  return (
    <Stack spacing={6}>
      <Stack>
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
        <Avatar name="Barack Obama" size="sm"></Avatar>
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
