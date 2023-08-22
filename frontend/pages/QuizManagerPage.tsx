import {
  AbsoluteCenter, Box, Button, Card, CardBody, Center,
  Divider, Heading, IconButton, Spacer, Stack
} from '@chakra-ui/react';
import ApiClient from '@/utils/api-client';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
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
    <Box margin='50px'>
      <Heading as='h3' size='lg' marginTop='40px' marginBottom='20px'>Quiz Manager</Heading>
      <Link href='/QuizCreationPage'>
        <Button marginTop='20px' marginBottom='40px' colorScheme='blue'>Create Quiz</Button>
      </Link>
      <Box position='relative'>
        <Divider borderWidth='1px'/>
        <AbsoluteCenter background='white' padding='10px'>
          {`${quizzes.length > 0 ? quizzes.length : 'No'} Quizzes`}
        </AbsoluteCenter>
      </Box>
      <Stack spacing='20px' marginTop='40px' marginBottom='40px'>
        {quizzes.map((quiz: Quiz) => (
          <Card key={quiz.id}>
            <CardBody>
              <Stack direction='row'>
                <Stack direction='column'>
                  <Heading as='h4' size='md'>{quiz.title}</Heading>
                  <Box>{`Description: ${quiz.description}`}</Box>
                  <Stack direction='row'>
                    <Box>{`Question Count: 0`}</Box>
                    <Box>{`Time Limit: 0 m`}</Box>
                  </Stack>
                </Stack>
                <Spacer/>
                <Center>
                  <Stack direction='row'>
                    <IconButton aria-label='Edit' icon={<BiEdit/>}/>
                    <IconButton
                        aria-label='Delete' icon={<MdDelete/>} background='red'
                        color='white'
                      />
                  </Stack>
                </Center>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
