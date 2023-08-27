import { Text, Textarea, RadioGroup, Radio, VStack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type AnyObj = {[key: string]: any}

type QuizQuestionProps = {
  id: string;
  questionTitle: string;
  questionAnswers: any[] | undefined;
  questionType: any;
  userAnswers: AnyObj;
  setUserAnswers: Dispatch<SetStateAction<AnyObj>>;
};

const QuizQuestion = ({
  id,
  questionTitle,
  questionAnswers,
  questionType,
  userAnswers,
  setUserAnswers
}: QuizQuestionProps) => {
  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    userAnswers[id] = e.currentTarget.value;
    setUserAnswers(userAnswers)
  }

  return (
    <>
      <Text as={'b'} fontSize={'lg'}>
        {questionTitle}
      </Text>
      {questionType === 'multiple_choice' ? (
        <RadioGroup>
          <VStack>
            {questionAnswers?.map((answer) => (
              <Radio key={answer.option_id} value={answer.option} onChange={onChange}>
                {answer.option}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      ) : (
        <Textarea onChange={onChange}/>
      )}
    </>
  );
};

export default QuizQuestion;
