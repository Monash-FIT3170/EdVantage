import { AuthContextProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import theme from '@/utils/theme';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '../styles/global.css';
import { useRouter } from 'next/router';
import { UserContextProvider } from '@/components/UserProvider';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname !== '/login';

  return (
    <GoogleOAuthProvider clientId="185496584407-89i5ueqb54cdd3172fp9pfca3up8mdn9.apps.googleusercontent.com">
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <UserContextProvider>
            <Flex>
              {isLoginPage && <Sidebar />}
              <main>
                {isLoginPage && <Navbar />}
                <Component {...pageProps} />
              </main>
            </Flex>
          </UserContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
