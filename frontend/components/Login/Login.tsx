import { useContext } from 'react';
import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { AuthContext } from '@/utils/auth';
import styles from './login.module.css';

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
    <Box
      className={styles.loginContainer}
      position={'relative'}
      w={'100vw'}
      h={'100vh'}
    >
      <Box
        position={'absolute'}
        w={'full'}
        h={'full'}
        filter={'auto'}
        blur={'4px'}
      >
        <Center h={'full'}>
          <Heading
            as={'h1'}
            fontSize="9xl"
            bgGradient={'linear(to right, #EDE342, #FF51EB)'}
            bgClip={'text'}
          >
            EdVantage
          </Heading>
        </Center>
      </Box>
      <Box position={'absolute'} w={'full'} h={'full'}>
        <Center h={'full'}>
          <Box
            zIndex={10}
            p={8}
            w={{ base: 'sm', lg: 'md' }}
            borderRadius={'lg'}
            boxShadow={'lg'}
            backdropFilter={'auto'}
            backdropBlur={'8px'}
          >
            <VStack spacing={8}>
              <Heading size="xl">EdVantage</Heading>
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </VStack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Login;
