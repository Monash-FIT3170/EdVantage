import { Request, Response, Router } from 'express';
import PostgresClient from '../persistence/PostgresClient';
import {
  Question,
  QuestionType,
  Quiz,
  QuizAnswer,
  QuizAttempt,
  QuizQuestion,
  QuizQuestionResult,
} from './QuizTypes';

const quizRouter = Router();
const postgresClient = new PostgresClient();

// Define a route to get all quizzes
quizRouter.get('/quiz', async (req: Request, res: Response) => {
  let quizzes = [];

  if (req.query.unit_code != null) {
    quizzes = await buildQuizByUnit(req.query.unit_code.toString());
  } else {
    let i = 1, quiz = await buildQuiz(i);

    while (i < 10 && quiz) {
      quizzes.push(quiz);
      i++;
      quiz = await buildQuiz(i);
    }
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

// Define a route to create a quiz and its questions
quizRouter.post('/quiz', async (req: Request, res: Response) => {
  const body: any = req.body;
  const quiz_id = await createQuiz(body);

  for (let i=0; i < body.questions.length; i++) {
    console.log(body.questions[i])
    await createQuestion(body.questions[i], quiz_id);
  }

  res.status(200).send(quiz_id);
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
    let queryValues = [attempt_id, id, answer.answer, isCorrect];
    await postgresClient.query(
      `INSERT INTO question_results(attempt_id, question_id, user_answer, result) VALUES ($1, $2, $3, $4);`,
      queryValues
    );
    console.log(question, answer, isCorrect);

    if (isCorrect) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  }
);

// Define a route to create a new quiz attempt for a specified user and quiz
quizRouter.post('/quiz/attempt', async (req: Request, res: Response) => {
  const params: { u_id: number; q_id: number } = req.body;
  console.log(params);

  let queryValues = [params.u_id, params.q_id];
  var id = await postgresClient.query(
    `INSERT INTO quiz_attempts(user_id, quiz_id) VALUES ($1, $2) RETURNING attempt_id;`,
    queryValues
  );

  res.status(200).send({ attempt_id: id });
});

// Define a route to update an attempt with it's score
quizRouter.post(
  '/quiz/attempt/:attempt_id',
  async (req: Request, res: Response) => {
    const attempt_id = parseInt(req.params.attempt_id);

    const params: { score: number } = req.body;
    console.log(params);

    let queryValues = [params.score, attempt_id];
    await postgresClient.query(
      `UPDATE quiz_attempts SET percentage=$1 WHERE attempt_id=$2;`,
      queryValues
    );

    res.status(200);
  }
);

// Define a route to get the details of a quiz attempt
quizRouter.get(
  '/quiz/attempt/:attempt_id',
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.attempt_id);
    const result = await buildResult(id);

    console.log(result);
    res.status(200).send(result);
  }
);

// Define a route to get all quiz results for a given user
quizRouter.get(
  '/quiz/results/:student_id',
  async (req: Request, res: Response) => {
    const id = req.params.student_id;
    const attempts = await buildAttempts(id);

    res.status(200).send(attempts);
  }
);

// Define a helper function to check a quiz answer
function checkAnswer(question: Question, answer: string): boolean {
  return question.correct_answers.includes(answer);
}

// Define a helper function to build a question object from a database response
async function buildQuestion(id: number): Promise<Question | null> {
  const questionResp = await postgresClient.query(
    `SELECT * FROM questions WHERE question_id = $1`,
    [id]
  );
  if (questionResp.length == 0) {
    return null;
  }

  const question: Question = questionResp[0];

  const answers = await postgresClient.query(
    `SELECT * FROM question_answers WHERE question_id = $1`,
    [id]
  );

  const answer_arr = [];
  for (let i = 0; i < answers.length; i++) {
    answer_arr.push(answers[i].answer);
  }

  question.correct_answers = answer_arr;
  if (question.question_type == QuestionType.MULTIPLE_CHOICE) {
    question.choices = await postgresClient.query(
      `SELECT * from question_choices WHERE question_id = $1`,
      [id]
    );
  }

  return question;
}

// Define a helper function to build a quiz object from a database response
async function buildQuiz(id: number): Promise<Quiz | null> {
  const quizResp = await postgresClient.query(
    `SELECT * FROM quizzes WHERE quiz_id = $1`,
    [id]
  );
  if (quizResp.length == 0) {
    return null;
  }

  const quiz: Quiz = quizResp[0];
  quiz.questions = [];

  const quizQuestions: QuizQuestion[] = await postgresClient.query(
    `SELECT * FROM quiz_questions WHERE quiz_id = $1`,
    [id]
  );
  for (let i = 0; i < quizQuestions.length; i++) {
    const nextQuestion = await buildQuestion(quizQuestions[i].question_id);
    if (!nextQuestion) continue;

    quiz.questions.push(nextQuestion);
  }

  return quiz;
}

async function buildQuizByUnit(unit_code: string): Promise<Quiz[]> {
  console.log(unit_code)
  const quizResp = await postgresClient.query(
      `SELECT * FROM quizzes WHERE unit_code = $1`,
      [unit_code]
  );
  console.log(quizResp)

  for (let i = 0; i < quizResp.length; i++) {
    let currQuiz = quizResp[i];
    currQuiz.questions = [];

    const quizQuestions: QuizQuestion[] = await postgresClient.query(
        `SELECT * FROM quiz_questions WHERE quiz_id = $1`,
        [currQuiz.quiz_id]
    );

    for (let j = 0; j < quizQuestions.length; j++) {
      const nextQuestion = await buildQuestion(quizQuestions[j].question_id);
      if (!nextQuestion) continue;

      currQuiz.questions.push(nextQuestion);
    }

    quizResp[i] = currQuiz;
  }

  console.log(quizResp)
  return quizResp;
}

// Define a helper function to build a user's quiz attempts
async function buildAttempts(id: string): Promise<QuizAttempt[]> {
  const attemptResp = await postgresClient.query(
    `SELECT qa.*, q.title FROM quiz_attempts qa JOIN quizzes q ON qa.quiz_id = q.quiz_id WHERE qa.user_id = $1`,
    [id]
  );
  if (attemptResp.length == 0) {
    return [];
  }

  return attemptResp;
}

// Define a helper function to build a specific quiz result and it's questions
async function buildResult(id: number): Promise<QuizQuestionResult[]> {
  const resultResp = await postgresClient.query(
    `SELECT qr.*, q.*, array_agg(qa.answer) FROM question_results qr JOIN questions q on q.question_id = qr.question_id JOIN question_answers qa on q.question_id = qa.question_id WHERE attempt_id=$1 GROUP BY q.question_id, qr.result_id`,
    [id]
  );
  if (resultResp.length == 0) {
    return [];
  }

  return resultResp;
}

// Define a helper function to add a quiz to DB from JSON
async function createQuiz(body: any): Promise<number> {
  return await postgresClient.query(
      `INSERT INTO quizzes (title, description, unit_code)
       VALUES ($1, $2, $3)
       RETURNING quiz_id`,
      [body.title, body.description, body.unit_code]
  );
}

// Define a helper function to create a new question and attach it to a quiz
async function createQuestion(body: any, quiz_id: any): Promise<void> {
  let question_id = await postgresClient.query(
      `INSERT INTO questions (question, question_type) 
                VALUES ($1, $2)
                RETURNING question_id`,
      [body.title, body.type]
  );
  question_id = question_id[0]["question_id"]

  if (body.type == "multiple_choice") {
    for (let i=0; i < body.choices.length; i++) {
      console.log(body.choices[i])
      await postgresClient.query(
          `INSERT INTO question_choices (question_id, option, is_correct) VALUES ($1, $2, $3)`,
          [parseInt(question_id), body.choices[i].option, false]
      )
    }
  }

  for (let i=0; i < body.answers.length; i++) {
    await postgresClient.query(
        `INSERT INTO question_answers (question_id, answer) VALUES ($1, $2)`,
        [parseInt(question_id), body.answers[i].answer]
    )
  }

  await postgresClient.query(
      `INSERT INTO quiz_questions (quiz_id, question_id) VALUES ($1, $2)`,
      [parseInt(quiz_id[0]["quiz_id"]), parseInt(question_id)]
  )
}

export default quizRouter;
export { quizRouter };
