import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar/Sidebar';
import theme from '@/utils/theme';
import { AuthContext } from '@/utils/auth';
import '../styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const showSidebar = router.pathname !== '/login';

  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  const login = () => {
    setIsLoggedIn(true);
    router.push('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    router.push('/login');
  };

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
        <Flex>
          <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {showSidebar && <Sidebar />}
            <main>
              <Component {...pageProps} />
            </main>
          </AuthContext.Provider>
        </Flex>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
