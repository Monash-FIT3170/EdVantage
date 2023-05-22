import {Button, VStack} from '@chakra-ui/react';
import QuizQuestion from '@/components/Quiz/QuizQuestion';

const Quiz = ({ quiz }: any) => {
  return (
    <VStack alignItems={'flex-start'}>
      {quiz.questions.map((question: any) => (
        <QuizQuestion
          key={question.question_id}
          questionTitle={question.question}
          questionAnswers={question.choices}
          questionType={question.question_type}
        />
      ))}
      <Button variant={"solid"} colorScheme="blue" onClick={}>
        Submit
      </Button>
    </VStack>
  );
};

export default Quiz;
