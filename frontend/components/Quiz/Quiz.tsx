import {Button, ButtonGroup, VStack} from '@chakra-ui/react';
import QuizQuestion from '@/components/Quiz/QuizQuestion';
import {useContext, useEffect, useState} from 'react';
import ApiClient from '@/utils/api-client';
import {AuthContext} from "@/components/AuthProvider";

const Quiz = ({ quiz }: any) => {
  const api = new ApiClient();
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: any }>({});
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState(0);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setUserAnswers({});
  }, [quiz]);

  const submitAnswers = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const attempt_params = {u_id: auth?.user?.userId, q_id: quiz.value};
    const attempt_resp = await api.post(`quiz/attempt`, '', attempt_params);
    let attempt_id = await attempt_resp.json();
    attempt_id = attempt_id['attempt_id'][0]['attempt_id'];

    const responses = Object.entries(userAnswers).map(([key, value], id) => {
      const answer = { question_id: key, answer: value };
      return api.post(`quiz/question/${key}/answer/${attempt_id}`, '', answer);
    });

    const fulfilled = await Promise.all(responses);

    let score = 0;
    for (const res of fulfilled) {
      const answer = await res.json();
      if (answer == true) {
        score++;
      }
    }

    setScore(score);
    setAnswered(true);
    await api.post(`quiz/attempt/${attempt_id}`, '', {score: (score * 100) / quiz.questions.length});
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
      {answered && (<div>{(score * 100) / quiz.questions.length}%</div>)}
    </VStack>
  );
};

export default Quiz;
