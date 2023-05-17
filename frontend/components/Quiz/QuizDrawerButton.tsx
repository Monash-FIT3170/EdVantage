import type { Quiz } from '../../../api/src/routes/QuizTypes';

import { useRef, useEffect, useState } from 'react';
import {
  ButtonGroup,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  VStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import QuizQuestion from './QuizQuestion';
import ApiClient from '@/utils/api-client';

const QuizDrawerButton = ({ id }: { id: string }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const apiClient = new ApiClient();
    apiClient
      .get(`quiz/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant={'solid'}
        colorScheme="blue"
      >
        Quiz
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement={'right'}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          {isLoading ? (
            <Center h="100%">
              <Spinner size={'xl'} />
            </Center>
          ) : (
            <>
              <DrawerHeader>{quiz?.title}</DrawerHeader>
              <DrawerBody>
                <VStack alignItems={'flex-start'}>
                  {quiz?.questions.map((question) => (
                    <QuizQuestion
                      key={question.question_id}
                      questionTitle={question.question}
                      questionAnswers={question.choices}
                      questionType={question.question_type}
                    />
                  ))}
                </VStack>
              </DrawerBody>
            </>
          )}

          <DrawerFooter>
            <ButtonGroup spacing={2}>
              <Button onClick={onClose} variant={'outline'}>
                Close
              </Button>
              <Button variant={'solid'} colorScheme="blue">
                Submit
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default QuizDrawerButton;
