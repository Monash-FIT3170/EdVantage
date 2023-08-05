import ShortAnswerCreate from './ShortAnswerCreate';
import { useEffect, useState } from 'react';
import { Stack, Radio, RadioGroup, IconButton, Button } from '@chakra-ui/react';
import MultipleChoiceQuestionCreate from './MultipleChoiceQuestionCreate';
type questionCardProp = {
  id: number;
  quizId: number;
  setQuestion: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  deleteAction: (id: number) => void;
};
const QuestionCard = (props: questionCardProp) => {
  const classId = 'type-' + props.id;

  const [questionType, setQuestionType] = useState('short-answer');
  const handleDelete = () => {
    props.deleteAction(props.id);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          marginLeft: '10px',
        }}
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
        <div>
          <Button
            colorScheme="blue"
            size="xs"
            style={{ marginLeft: '10px' }}
            onClick={handleDelete}
          >
            Delete Question
          </Button>
        </div>
      </div>
      <div>
        {questionType === 'short-answer' ? (
          <ShortAnswerCreate />
        ) : (
          <MultipleChoiceQuestionCreate />
        )}
      </div>
    </div>
  );
};
export default QuestionCard;
