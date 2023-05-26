import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import { AuthContext, type UserInfo } from '@/utils/auth';
import theme from '@/utils/theme';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const router = useRouter();
  const showSidebar = router.pathname !== '/login';

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local') {
      if (!isLoggedIn && router.pathname !== '/login') {
        router.push('/login');
      }
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
        <AuthContext.Provider
          value={{ isLoggedIn, login, logout, user, setUser }}
        >
          <Flex>
            {showSidebar && <Sidebar />}
            <main>
              <Navbar />
              <Component {...pageProps} />
            </main>
          </Flex>
        </AuthContext.Provider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
