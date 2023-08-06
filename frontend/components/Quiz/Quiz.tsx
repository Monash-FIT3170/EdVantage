import { Button, VStack } from '@chakra-ui/react';
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import { useEffect, useState } from 'react';
import ApiClient from '@/utils/api-client';

const Quiz = ({ quiz }: any) => {
  const api = new ApiClient();
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setUserAnswers({});
  }, [quiz]);

  const submitAnswers = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    console.log(userAnswers);
    setScore(0);

    // Using example user 8 for results testing while User integration is WIP
    const attempt_params = {u_id: 8, q_id: quiz.value};
    const attempt_resp = await api.post(`quiz/start`, '', attempt_params);
    const attempt_id = await attempt_resp.json();

    const responses = Object.entries(userAnswers).map(([key, value], id) => {
      const answer = { question_id: key, answer: value };
      return api.post(`quiz/question/${key}/answer/${attempt_id['attempt_id'][0]['attempt_id']}`, '', answer);
    });

    const fulfilled = await Promise.all(responses);

    let correct = true;
    for (const res of fulfilled) {
      const answer = await res.json();
      if (answer == true) {
        setScore((prevScore) => prevScore + 1);
      }
    }

    if (Object.values(userAnswers).length < quiz.questions.length) {
      correct = false;
    }
    setAnswered(true);
  };

  return (
    <VStack alignItems={'flex-start'}>
      {quiz.questions.map((question: any) => (
        <QuizQuestion
          key={question.question_id}
          id={question.question_id}
          questionTitle={question.question}
          questionAnswers={question.choices}
          questionType={question.question_type}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
      ))}
      <Button variant={'solid'} colorScheme="blue" onClick={submitAnswers}>
        Submit
      </Button>
      {answered && <div>{(score * 100) / quiz.questions.length}%</div>}
    </VStack>
  );
};

export default Quiz;
