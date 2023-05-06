import {Request, Response, Router} from 'express';
import PostgresClient from "../persistence/PostgresClient";

enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SHORT_ANSWER = 'short_answer'
}

type QuizQuestion = {
  question_id: number;
  question: string;
  question_type: QuestionType;
  correct_answers: string[];
  choices?: QuizOption[];
  //nextQuestionId?: number;
};

type QuizAnswer = {
  question_id: number;
  answer: string;
};

type QuizOption = {
  option_id: number;
  question_id: number;
  option: string;
  is_correct: boolean;
}

type QuizAnswerResponse = {
  isCorrect: boolean;
  nextQuestionId?: number
}

const quizRouter = Router();
const postgresClient = new PostgresClient();

// Define a route to get a quiz question by ID
quizRouter.get('/quiz/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const question = await buildQuestion(id);

  if (question) {
    res.status(200).send(question);
  } else {
    res.status(404).send('Quiz question not found');
  }
});

// Define a route to post a quiz answer
quizRouter.post('/quiz/:id/answer', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const answer: QuizAnswer = req.body;

  // Find the corresponding quiz question
  const question: QuizQuestion | null = await buildQuestion(id);
  if (!question) res.status(404).send('Quiz question not found');

  const isCorrect = checkAnswer(question!, answer.answer);

  if (isCorrect) {
    res.status(200).send("Answer is correct");
  } else {
    res.status(200).send("Answer is incorrect");
  }
});

// Define a helper function to check a quiz answer
function checkAnswer(question: QuizQuestion, answer: string): boolean {
  return question.correct_answers.includes(answer);
}

async function buildQuestion(id: number): Promise<QuizQuestion | null> {
  const questionResp = await postgresClient.query(`SELECT * FROM quiz_questions WHERE question_id = ${id}`);
  if (questionResp.length == 0) {
    return null;
  }

  const question: QuizQuestion = questionResp[0]

  switch (question.question_type) {
    case QuestionType.MULTIPLE_CHOICE:
      const choices: QuizOption[] = await postgresClient.query(`SELECT * from quiz_options WHERE question_id = ${id}`);
      question.correct_answers = [];

      for (let i=0; i < choices.length; i++) {
        if (choices[i].is_correct) {
          question.correct_answers.push(choices[i].option_id.toString());
        }
      }

      question.choices = choices;
      return question;
    case QuestionType.SHORT_ANSWER:
      const answer = await postgresClient.query(`SELECT * FROM quiz_answers WHERE question_id = ${id}`);
      question.correct_answers = [answer[0].answer];
      return question;
  }
}

export default quizRouter
export {quizRouter}