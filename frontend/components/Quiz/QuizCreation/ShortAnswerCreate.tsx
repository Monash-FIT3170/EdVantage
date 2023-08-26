import { Input, Button, Flex } from '@chakra-ui/react';
type questionCardProp = {
  id: number;
  quizId: number;
  question: string;
  // question_type: string;
  correct_answers: string[];
};
const ShortAnswerCreate = (prop: questionCardProp) => {
  return (
      <div style={{ marginBottom: '10px', display: 'flex' }}>
        <div style={{ width: '50%', marginLeft: '10px' }}>
          <Input
              placeholder={prop.question ? prop.question : 'Enter your question'}
              required
          />
          <Input
              placeholder={
                prop.correct_answers[0]
                    ? prop.correct_answers[0]
                    : 'Enter your correct answer'
              }
              required
          />
        </div>
      </div>
  );
};
export default ShortAnswerCreate;
