import {Request, Response, Router} from 'express';
import PostgresClient from "../persistence/PostgresClient";
import {Question, QuestionType, Quiz, QuizAnswer, QuizOption, QuizQuestion} from "./QuizTypes";

const quizRouter = Router();
const postgresClient = new PostgresClient();

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
quizRouter.post('/quiz/question/:id/answer', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const answer: QuizAnswer = req.body;

  // Find the corresponding quiz question
  const question: Question | null = await buildQuestion(id);
  if (!question) res.status(404).send('Quiz question not found');

  const isCorrect = checkAnswer(question!, answer.answer);

  if (isCorrect) {
    res.status(200).send("Answer is correct");
  } else {
    res.status(200).send("Answer is incorrect");
  }
});

// Define a helper function to check a quiz answer
function checkAnswer(question: Question, answer: string): boolean {
  return question.correct_answers.includes(answer);
}

// Define a helper function to build a question object from a database response
async function buildQuestion(id: number): Promise<Question | null> {
  const questionResp = await postgresClient.query(`SELECT * FROM questions WHERE question_id = ${id}`);
  if (questionResp.length == 0) {
    return null;
  }

  const question: Question = questionResp[0]

  switch (question.question_type) {
    case QuestionType.MULTIPLE_CHOICE:
      const choices: QuizOption[] = await postgresClient.query(`SELECT * from question_choices WHERE question_id = ${id}`);
      question.correct_answers = [];

      for (let i=0; i < choices.length; i++) {
        if (choices[i].is_correct) {
          question.correct_answers.push(choices[i].option_id.toString());
        }
      }

      question.choices = choices;
      return question;
    case QuestionType.SHORT_ANSWER:
      const answer = await postgresClient.query(`SELECT * FROM question_answers WHERE question_id = ${id}`);
      question.correct_answers = [answer[0].answer];
      return question;
  }
}

// Define a helper function to build a quiz object from a database response
async function buildQuiz(id: number): Promise<Quiz | null> {
  const quizResp = await postgresClient.query(`SELECT * FROM quizzes WHERE quiz_id = ${id}`);
  if (quizResp.length == 0) {
    return null;
  }

  const quiz: Quiz = quizResp[0];

  const quizQuestions: QuizQuestion[] = await postgresClient.query(`SELECT * FROM quiz_questions WHERE quiz_id = ${id}`);
  for (let i=0; i < quizQuestions.length; i++) {
    const nextQuestion = await buildQuestion(quizQuestions[i].question_id);
    if (!nextQuestion) continue;

    quiz.questions.push(nextQuestion);
  }

  return quiz;
}

export default quizRouter
export {quizRouter}