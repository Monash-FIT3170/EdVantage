import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import ApiClient from '@/utils/api-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';


interface Quiz {
  title: string;
  description: string;
  id: number;
}


export default function QuizManagerPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const apiClient = new ApiClient();
    
    apiClient.get('quiz').then(result => result.json()).then(data => {
      console.log('data = ', data);
      setQuizzes(data);
    }).catch(error => {
      console.log(error);
    });
  }, [setQuizzes]);

  return (
    <>
      <Heading as='h4' size='md'>Quiz Manager</Heading>
      <Link href='/QuizCreationPage'>
        <Button>Create Quiz</Button>
      </Link>
      <Stack>
        {quizzes.map((quiz: Quiz) => <Box key={quiz.id}>{quiz.title}</Box>)}
      </Stack>
    </>
  );
}
