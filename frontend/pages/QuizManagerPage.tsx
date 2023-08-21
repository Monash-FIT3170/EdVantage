import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';


export default function QuizManager() {
  return (
    <>
      <Heading as='h4' size='md'>Quiz Manager</Heading>
      <Link href='/QuizCreationPage'>
        <Button>Create Quiz</Button>
      </Link>
      <Stack>
        <Box>Quiz 1</Box>
      </Stack>
    </>
  );
}
