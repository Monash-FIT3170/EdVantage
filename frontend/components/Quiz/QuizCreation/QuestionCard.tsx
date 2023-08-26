import ShortAnswerCreate from './ShortAnswerCreate';
import { useEffect, useState } from 'react';
import {
  Stack,
  Radio,
  RadioGroup,
  IconButton,
  Button,
  effect,
} from '@chakra-ui/react';
import MultipleChoiceQuestionCreate from './MultipleChoiceQuestionCreate';
type questionCardProp = {
  id: number;
  quizId: number;
  question: string;
  question_type: string;
  choices: choiceProp[];
  correct_answer: string[];
  setQuestion: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  deleteAction: (id: number) => void;
};
type choiceProp = {
  option_id: number;
  question_id: number;
  option: string;
  is_correct: boolean;
};
const QuestionCard = (props: questionCardProp) => {
  const [questionType, setQuestionType] = useState('short_answer');

  useEffect(() => {
    setQuestionType((preQuestionType) => props.question_type);
  }, []);
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
          <div style={{ marginRight: '10px' }}>Question {props.id}: </div>

          <div>
            <RadioGroup onChange={setQuestionType} value={questionType}>
              <Stack direction="row">
                <Radio value="short_answer"> Short Answer</Radio>
                <Radio value="multiple_choice"> Multiple Choice</Radio>
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
          {questionType === 'short_answer' ? (
              <ShortAnswerCreate
                  id={props.id}
                  quizId={props.quizId}
                  question={props.question}
                  correct_answers={props.correct_answer}
              />
          ) : (
              <MultipleChoiceQuestionCreate
                  id={props.id}
                  quizId={props.quizId}
                  question={props.question}
                  correct_answers={props.correct_answer}
                  choices={props.choices}
              />
          )}
        </div>
      </div>
  );
};
export default QuestionCard;
