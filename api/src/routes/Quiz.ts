import {Request, Response, Router} from 'express';
import PostgresClient from '../persistence/PostgresClient';
import {Question, QuestionType, Quiz, QuizAnswer, QuizAttempt, QuizOption, QuizQuestion,} from './QuizTypes';

const quizRouter = Router();
const postgresClient = new PostgresClient();

// Define a route to get all quizzes
quizRouter.get('/quiz', async (req: Request, res: Response) => {
  let i = 1, quizzes = [], quiz = await buildQuiz(i);
  while (i < 10 && quiz) {
    quizzes.push(quiz);
    i++;
    quiz = await buildQuiz(i);
  }

  if (quizzes.length > 0) {
    res.status(200).send(quizzes);
  } else {
    res.status(404).send('No quizzes found');
  }
});

// Define a route to get a quiz by ID
quizRouter.get('/quiz/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const quiz = await buildQuiz(id);

  if (quiz) {
    res.status(200).send(quiz);
  } else {
    res.status(404).send('Quiz not found');
  }
});

// Define a route to get a quiz question by ID
quizRouter.get('/quiz/question/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const question = await buildQuestion(id);

  if (question) {
    res.status(200).send(question);
  } else {
    res.status(404).send('Quiz question not found');
  }
});

// Define a route to post a quiz answer
quizRouter.post(
  '/quiz/question/:id/answer/:attempt_id',
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const attempt_id = parseInt(req.params.attempt_id);
    const answer: QuizAnswer = req.body;

    // Find the corresponding quiz question
    const question: Question | null = await buildQuestion(id);
    if (!question) res.status(404).send('Quiz question not found');

    const isCorrect = checkAnswer(question!, answer.answer);
    await postgresClient.query(
        `INSERT INTO question_results(attempt_id, question_id, answer, result) VALUES (${attempt_id}, ${id}, ${answer.answer}, ${isCorrect});`
    );
    console.log(question, answer, isCorrect)

    if (isCorrect) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  }
);

quizRouter.post(
    '/quiz/attempt',
    async (req: Request, res: Response) => {
      const params: {u_id: number, q_id: number} = req.body;
      console.log(params);

      var id = await postgresClient.query(
          `INSERT INTO quiz_attempts(user_id, quiz_id) VALUES (${params.u_id}, ${params.q_id}) RETURNING attempt_id;`
      );

      res.status(200).send({attempt_id: id});
    }
);

quizRouter.post(
    '/quiz/attempt/:attempt_id',
    async (req: Request, res: Response) => {
      const attempt_id = parseInt(req.params.attempt_id);

      const params: {score: number} = req.body;
      console.log(params);

      await postgresClient.query(
          `UPDATE quiz_attempts SET percentage=${params.score} WHERE attempt_id=${attempt_id};`
      );

      res.status(200);
    }
);

quizRouter.get(
    '/quiz/results/:student_id',
    async (req: Request, res: Response) => {
      const id = parseInt(req.params.student_id);
      const attempts = await buildAttempts(id);

      console.log(attempts);
      res.status(200).send(attempts);
    }
)

// Define a helper function to check a quiz answer
function checkAnswer(question: Question, answer: string): boolean {
  return question.correct_answers.includes(answer);
}

// Define a helper function to build a question object from a database response
async function buildQuestion(id: number): Promise<Question | null> {
  const questionResp = await postgresClient.query(
    `SELECT * FROM questions WHERE question_id = ${id}`
  );
  if (questionResp.length == 0) {
    return null;
  }

  const question: Question = questionResp[0];

  switch (question.question_type) {
    case QuestionType.MULTIPLE_CHOICE:
      const choices: QuizOption[] = await postgresClient.query(
        `SELECT * from question_choices WHERE question_id = ${id}`
      );
      question.correct_answers = [];

      for (let i = 0; i < choices.length; i++) {
        if (choices[i].is_correct) {
          question.correct_answers.push(choices[i].option.toString());
        }
      }

      question.choices = choices;
      return question;
    case QuestionType.SHORT_ANSWER:
      const answer = await postgresClient.query(
        `SELECT * FROM question_answers WHERE question_id = ${id}`
      );
      question.correct_answers = [answer[0].answer];
      return question;
  }
}

// Define a helper function to build a quiz object from a database response
async function buildQuiz(id: number): Promise<Quiz | null> {
  const quizResp = await postgresClient.query(
    `SELECT * FROM quizzes WHERE quiz_id = ${id}`
  );
  if (quizResp.length == 0) {
    return null;
  }

  const quiz: Quiz = quizResp[0];
  quiz.questions = [];

  const quizQuestions: QuizQuestion[] = await postgresClient.query(
    `SELECT * FROM quiz_questions WHERE quiz_id = ${id}`
  );
  for (let i = 0; i < quizQuestions.length; i++) {
    const nextQuestion = await buildQuestion(quizQuestions[i].question_id);
    if (!nextQuestion) continue;

    console.log(nextQuestion);

    quiz.questions.push(nextQuestion);
  }

  return quiz;
}

async function buildAttempts(id: number): Promise<QuizAttempt[]> {
    const attemptResp = await postgresClient.query(
        `SELECT qa.*, q.title FROM quiz_attempts qa JOIN quizzes q ON qa.quiz_id = q.quiz_id WHERE qa.user_id = ${id}`
    );
    if (attemptResp.length == 0) {
        return [];
    }

    return attemptResp;
}

export default quizRouter;
export { quizRouter };
