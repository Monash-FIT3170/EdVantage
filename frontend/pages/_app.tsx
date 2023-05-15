import type { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <main>
        <Flex flexDir={'row'}>
          <Sidebar />
          <Component {...pageProps} />
        </Flex>
      </main>
    </ChakraProvider>
  );
}
