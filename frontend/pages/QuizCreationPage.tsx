import {
  Button,
  ButtonGroup,
  Stack,
  Select,
  Input,
  Flex,
} from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';

import QuestionCard from '../components/Quiz/QuizCreation/QuestionCard';
import ApiClient from '@/utils/api-client';
interface quizzesProp {
  label: string;
  questions: questionProp[];
  value: number;
}
interface questionProp {
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

export default function QuizCreationPage() {
  const [questionSet, setQuestionSet] = useState<JSX.Element[]>([]);
  const [currentQuizzQuestion, setCurrentQuizzQuestion] = useState<questionProp[]>([]);
  const [quizzes, setQuizzes] = useState<quizzesProp[]>([]);
  const [quizID, setQuizID] = useState(1);  // Will be dynamic later
  const [isAdd, setIsAdd] = useState(true);
  const [quiz, setQuiz] = useState(0);

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
            Add New Quizz
          </option>
          {quizzes.map((quiz) => (
            <option key={quiz.value} value={quiz.value}>
              {quiz.label}
            </option>
          ))}
        </Select>
      </Stack>
      {isAdd && (
        <div style={{ display: 'Flex ', margin: '10px' }}>
          <div style={{ marginTop: '5px' }}>Quiz Name: </div>
          <Input style={{ width: '70%' }} required />
        </div>
      )}
      {questionSet.map((question) => question)}
      <Button
        onClick={addQuestion}
        colorScheme="blue"
        style={{ marginLeft: '10px' }}
      >
        Add Question
      </Button>
      <Button
        onClick={addQuestion}
        colorScheme="blue"
        style={{ marginLeft: '10px' }}
      >
        Submit
      </Button>
    </div>
  );
}
