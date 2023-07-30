import { Button, ButtonGroup, Stack, Select } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';

import QuestionCard from './QuestionCard';
import ApiClient from '@/utils/api-client';

const QuizCreationPage = () => {
  const [questionSet, setQuestionSet] = useState<JSX.Element[]>([]);
  const [quizzes, setQuizzes] = useState<any>(null);
  const quizID = 1; // will be dynamid later

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
          currQuiz.questions = data[i].questions;
          quizResponses.push(currQuiz);
        }
        setQuizzes(quizResponses);
      })
      .catch((err) => console.error(err));
  }, []);
  const addQuestion = () => {
    // Create a new QuestionCard object (not JSX) and add it to the existing list of components
    setQuestionSet([
      ...questionSet,
      <QuestionCard
        key={questionSet.length}
        id={questionSet.length}
        quizId={quizID}
      />,
    ]);
    console.log(quizzes);
  };

  return (
    <div>
      {questionSet.map((question) => question)}
      <Button onClick={addQuestion} colorScheme="blue">
        Add Question
      </Button>
    </div>
  );
};

export default QuizCreationPage;
