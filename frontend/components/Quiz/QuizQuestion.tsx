import type {
  QuestionType,
  QuizOption,
} from '../../../api/src/routes/QuizTypes';
import { Text, Textarea, RadioGroup, Radio, VStack } from '@chakra-ui/react';

type QuizQuestionProps = {
  questionTitle: string;
  questionAnswers: QuizOption[] | undefined;
  questionType: QuestionType;
};

const QuizQuestion = ({
  questionTitle,
  questionAnswers,
  questionType,
}: QuizQuestionProps) => {
  return (
    <>
      <Text as={'b'} fontSize={'lg'}>
        {questionTitle}
      </Text>
      {questionType === 'multiple_choice' ? (
        <RadioGroup>
          <VStack>
            {questionAnswers?.map((answer) => (
              <Radio key={answer.option_id} value={answer.option}>
                {answer.option}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      ) : (
        <Textarea />
      )}
    </>
  );
};

export default QuizQuestion;
