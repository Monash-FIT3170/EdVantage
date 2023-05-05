import { Request, Response, Router } from 'express';

enum QuizType {
  MULTIPLE_CHOICE,
  TEXT
}

type QuizQuestion = {
  id: number;
  question: string;
  type: QuizType;
  choices?: string[];
  answer?: string;
  nextQuestionId?: number;
};

type QuizAnswer = {
  questionId: number;
  answer: string;
};

type QuizAnswerResponse = {
  isCorrect: boolean;
  nextQuestionId?: number
}

// Example quiz questions while we build out the schema
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    type: QuizType.TEXT,
    answer: "paris"
  },
  {
    id: 2,
    question: 'What is the largest ocean in the world?',
    type: QuizType.MULTIPLE_CHOICE,
    choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    answer: "pacific ocean"
  },
];

const quizRouter = Router();

// Define a route to get a quiz question by ID
quizRouter.get('/quiz/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const question = quizQuestions.find((q) => q.id === id);

  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).send('Quiz question not found');
  }
});

// Define a route to post a quiz answer
quizRouter.post('/quiz/answer', (req: Request, res: Response) => {
  const answer: QuizAnswer = req.body;

  // Find the corresponding quiz question
  const question = quizQuestions.find((q) => q.id === answer.questionId);

  if (question) {
    // Check the answer and return the result
    const isCorrect = checkAnswer(question, answer.answer);

    const response: QuizAnswerResponse = {
      isCorrect,
      nextQuestionId: undefined
    }

    res.status(200).json(response);
  } else {
    res.status(404).send('Quiz question not found');
  }
});

// Define a helper function to check a quiz answer
function checkAnswer(question: QuizQuestion, answer: string): boolean {
  return answer.toLowerCase() === question.answer?.toLowerCase();
}

export default quizRouter 
export {quizRouter}