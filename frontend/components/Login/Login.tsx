import { AuthContext } from '@/components/AuthProvider';
import ApiClient from '@/utils/api-client';
import { UserRole } from '@/utils/types';
import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from './Login.module.css';

const Login = () => {
  const apiClient = new ApiClient();
  const auth = useContext(AuthContext);
  const login = useGoogleLogin({
    scope: 'profile',
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse);
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' +
            tokenResponse.access_token
        );
        const userInfo = await response.json();
        console.log(userInfo);

        // Call the login endpoint to create or update the user - user role defaults to student in Postgres
        await apiClient.post(`login`, '', {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
        });

        const roleResponse = await apiClient.get(
          `auth/userRole`,
          `email=${userInfo.email}`
        );
        const { role } = await roleResponse.json();
        console.log(role);

        if (!Object.values(UserRole).includes(role)) {
          console.error('Invalid user role:', role);
          // Handle the error of invalid role
        } else {
          auth?.login?.();
          auth?.setUser?.({
            userId: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            role: role as UserRole,
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    onError: (errorResponse) =>
      console.error(
        `Login failed: ${errorResponse.error} ${errorResponse.error_description}`
      ),
  });

  return (
    <Box
      className={styles.loginContainer}
      position={'relative'}
      w={'100vw'}
      h={'100dvh'}
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
            fontSize={{ base: '7xl', lg: '9xl' }}
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
              <Heading size="2xl">EdVantage</Heading>
              <Button
                onClick={() => login()}
                leftIcon={<FaGoogle />}
                colorScheme="purple"
                size={'lg'}
                transition={'ease 0.4s'}
                _hover={{
                  boxShadow: 'md',
                  background: 'purple.300',
                }}
              >
                Sign in with Google
              </Button>
              {/* <GoogleLogin onSuccess={onSuccess} onError={onError} /> */}
            </VStack>
          </Box>
        </Center>
      </Box>
    </Box>
  );
};

export default Login;
