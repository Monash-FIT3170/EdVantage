import type { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar/Sidebar';
import theme from '@/utils/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Sidebar />
        <main>
          <Component {...pageProps} />
        </main>
      </Flex>
    </ChakraProvider>
  );
}
