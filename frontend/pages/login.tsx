import { useContext } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { AuthContext } from '@/utils/auth';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';

const Login = () => {
  const auth = useContext(AuthContext);

  const onSuccess = (res: CredentialResponse) => {
    console.log('Login Passed');
    try {
      auth?.login();
    } catch (err) {
      console.error(err);
    }
  };

  const onError = () => {
    console.error('Login Failed');
  };

  return (
    <Center w={'100vw'} h={'100vh'}>
      <Box
        p={8}
        maxW={{ base: 'lg', lg: '3xl' }}
        borderRadius={'lg'}
        borderWidth={'1px'}
      >
        <VStack spacing={6}>
          <Heading>EdVantage</Heading>
          <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
