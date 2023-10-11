import { useQuizCreationContext } from '@/pages/QuizCreationPage';
import { Input, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
type questionCardProp = {
  id: number;
  quizId: number;
  question: string;
  // question_type: string;
  correct_answers: string[];
};
const ShortAnswerCreate = (prop: questionCardProp) => {
  const { questionInformation, setQuestionInformation } = useQuizCreationContext();

  const [question, setQuestion] = useState(prop.question || '');
  const [answer, setAnswer] = useState(prop.correct_answers || []);

  useEffect(() => {
    const saInfo = {
      question_id: prop.id,
      question: question,
      title: question,
      type: 'short_answer',
      question_type: 'short_answer',
      choices: [],
      correct_answers: answer,
      answers: answer.map(ans => ({ answer: ans }))
    }
    setQuestionInformation(prop.id, saInfo)
  }, [question, answer])

  return (
      <div style={{ marginBottom: '10px', display: 'flex' }}>
        <div style={{ width: '50%', marginLeft: '10px' }}>
          <Input
              placeholder={prop.question ? prop.question : 'Enter your question'}
              onChange={(e) => setQuestion(e.target.value)}
              required
          />
          <Input
              placeholder={
                prop.correct_answers[0]
                    ? prop.correct_answers[0]
                    : 'Enter your correct answer'
              }
              onChange={(e) => setAnswer([e.target.value])}
              required
          />
        </div>
      </div>
  );
};
export default ShortAnswerCreate;
