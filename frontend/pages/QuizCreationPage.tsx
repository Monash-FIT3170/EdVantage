import {
  Button,
  ButtonGroup,
  Stack,
  Select,
  Input,
  Flex,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';

import QuestionCard from '../components/Quiz/QuizCreation/QuestionCard';
import ApiClient from '@/utils/api-client';

interface quizzesProp {
  label: string;
  questions: QuestionAnswerType[];
  value: number;
}
export interface QuestionAnswerType {
  question_id: number;
  question: string;
  question_type: string;
  choices: choiceProp[];
  correct_answers: string[];
}
type choiceProp = {
  option_id: number;
  question_id: number;
  option: string;
  is_correct: boolean;
};

export type QuizCreationContextType = {
  questionInformation: Map<number, QuestionAnswerType>;
  setQuestionInformation(id: number, questionInformation: QuestionAnswerType): void;
}

const QuizCreationContext = React.createContext<QuizCreationContextType>({
  questionInformation: new Map<number, QuestionAnswerType>(),
  setQuestionInformation: () => { }
})

export const useQuizCreationContext = () => React.useContext(QuizCreationContext);

export default function QuizCreationPage() {
  const [questionSet, setQuestionSet] = useState<JSX.Element[]>([]);
  const [currentQuizzQuestion, setCurrentQuizzQuestion] = useState<QuestionAnswerType[]>([]);
  const [quizzes, setQuizzes] = useState<quizzesProp[]>([]);
  const [quizID, setQuizID] = useState(1);  // Will be dynamic later
  const [isAdd, setIsAdd] = useState(true);
  const [quiz, setQuiz] = useState(0);
  const [questionAnswerInformation, setQuestionAnswerInformation] = useState<Map<number, QuestionAnswerType>>(new Map<number, QuestionAnswerType>());

  const setQuestionInformation = (id: number, questionInformation: QuestionAnswerType) => {
    setQuestionAnswerInformation((prevQuestionAnswerInformation) => {
      prevQuestionAnswerInformation.set(id, questionInformation);
      return prevQuestionAnswerInformation;
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");

  useEffect(() => {
    const apiClient = new ApiClient();
    apiClient
      .get(`quiz`)
      .then((res) => res.json())
      .then((data) => {
        const quizResponses = [];

        for (const i in data) {
          const currQuiz: any = {};
          currQuiz.label = data[i].title;
          currQuiz.value = data[i].quiz_id;
          // setQuizID((preQuizID) => data[i].quiz_id);
          currQuiz.questions = data[i].questions;
          quizResponses.push(currQuiz);
        }

        setQuizzes(quizResponses);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    for (let i = 0; i < currentQuizzQuestion.length; i++) {
      setQuestionSet((preQuestionSet) => [
        ...preQuestionSet,
        <QuestionCard
          key={currentQuizzQuestion[i].question_id}
          id={currentQuizzQuestion[i].question_id}
          question={currentQuizzQuestion[i].question}
          question_type={currentQuizzQuestion[i].question_type}
          choices={currentQuizzQuestion[i].choices}
          correct_answer={currentQuizzQuestion[i].correct_answers}
          quizId={quiz}
          setQuestion={setQuestionSet}
          deleteAction={deleteQuestion}
        />,
      ]);
    }
  }, [currentQuizzQuestion]);

  const deleteQuestion = (questionId: number) => {
    setQuestionSet((prevQuestionSet) =>
      prevQuestionSet.filter((question) => question.props.id !== questionId)
    );
  };

  const selecQuiz = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionSet((preQuestionSet) => []);

    if (event.target.value == 'addQuizz') {
      setIsAdd((prevIsAdd) => true);
      setCurrentQuizzQuestion((preCurrentQuizzQuestion) => []);
    } else {
      const selectQuestions = quizzes.find(
        (quiz) => quiz.value === parseInt(event.target.value)
      );
      if (selectQuestions) {
        setIsAdd((prevIsAdd) => false);
        setCurrentQuizzQuestion(
          (preCurrentQuizzQuestion) => selectQuestions.questions
        );
      }
    }
  };

  const addQuestion = () => {
    setQuestionSet([
      ...questionSet,
      <QuestionCard
        key={questionSet.length + 1}
        id={questionSet.length + 1}
        question={''}
        question_type={'short_answer'}
        choices={[]}
        correct_answer={[]}
        quizId={quizID}
        setQuestion={setQuestionSet}
        deleteAction={deleteQuestion}
      />,
    ]);
  };

  const submitQuiz = async () => {
    onOpen();
    const apiClient = new ApiClient();
    const quiz = {
      title: quizName,
      description: quizDescription,
      unit_code: "FIT3170",
      questions: Array.from(questionAnswerInformation.values())
    }
    await apiClient.post('quiz', "", quiz)
  }

  return (
    <div>
      <Stack
        spacing={4}
        style={{
          marginLeft: '10px',
          width: '70%',
          marginBottom: '10px',
          marginTop: '10px',
        }}
      >
        <Select name="quizzes" onChange={selecQuiz}>
          <option key="addQuizz" value="addQuizz">
            Add New Quiz
          </option>
          {quizzes.map((quiz) => (
            <option key={quiz.value} value={quiz.value}>
              {quiz.label}
            </option>
          ))}
        </Select>
      </Stack>
      {isAdd && (
        <div>
          <div style={{ display: 'Flex ', margin: '10px' }}>
            <div style={{ marginTop: '5px', marginRight: '5px' }}>Quiz Name: </div>
            <Input style={{ width: '70%' }} required value={quizName} onChange={(e) => setQuizName(e.target.value)} />
          </div>
          <div style={{ display: 'Flex ', margin: '10px' }}>
            <div style={{ marginTop: '5px', marginRight: '5px' }}>Quiz Description: </div>
            <Input style={{ width: '70%' }} onChange={(e) => setQuizDescription(e.target.value)} required />
          </div>
        </div>
      )}
      <QuizCreationContext.Provider value={{
        questionInformation: questionAnswerInformation,
        setQuestionInformation: setQuestionInformation
      }}>
        {questionSet.map((question) => question)}
      </QuizCreationContext.Provider>
      <Button
        onClick={addQuestion}
        colorScheme="blue"
        style={{ marginLeft: '10px' }}
      >
        Add Question
      </Button>
      <Button
        onClick={submitQuiz}
        colorScheme="blue"
        style={{ marginLeft: '10px' }}
      >
        Submit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quiz Created!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {quizName} has been created
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
