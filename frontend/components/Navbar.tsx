import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  return (
    <Flex
      w={'full'}
      py={3}
      px={32}
      justifyContent={'center'}
      boxShadow={useColorModeValue('base', 'dark-lg')}
    >
      <InputGroup minW={'lg'} maxW={'container.md'} size={'lg'}>
        <InputLeftElement pointerEvents={'none'}>
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder="Search" />
      </InputGroup>
    </Flex>
  );
};

export default Navbar;
