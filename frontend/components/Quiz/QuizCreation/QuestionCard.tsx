import ShortAnswerCreate from './ShortAnswerCreate';
import { useEffect, useState } from 'react';
import { Stack, Radio, RadioGroup } from '@chakra-ui/react';
type questionCardProp = {
  id: number;
  quizId: number;
};
const QuestionCard = (props: questionCardProp) => {
  const classId = 'type-' + props.id;

  const [questionType, setQuestionType] = useState('short-answer');

  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
      >
        <div style={{ marginRight: '10px' }}>Question {props.id + 1}: </div>

        <div>
          <RadioGroup onChange={setQuestionType} value={questionType}>
            <Stack direction="row">
              <Radio value="short-answer"> Short Answer</Radio>
              <Radio value="multiple-choice"> Multiple Choice</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div>
        {questionType === 'short-answer' ? (
          <ShortAnswerCreate />
        ) : (
          <div>hehe</div>
        )}
      </div>
    </div>
  );
};
export default QuestionCard;
