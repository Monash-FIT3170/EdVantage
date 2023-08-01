import { NextApiRequest, NextApiResponse } from 'next';
import {
  Question,
  QuestionType,
  Quiz,
  QuizAnswer,
  QuizOption,
  QuizQuestion,
} from '../../../utils/QuizTypes';
import PostgresClient from '@/utils/PostgresClient';

const postgresClient = new PostgresClient();

// Define a route to get all quizzes
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const id = parseInt(req.query.id as string);
    if (id) {
      const quiz = await buildQuiz(id);
      if (quiz) {
        res.status(200).json(quiz);
      } else {
        res.status(404).json({ message: 'Quiz not found' });
      }
    } else {
      const quizzes = await buildAllQuizzes();
      if (quizzes.length > 0) {
        res.status(200).json(quizzes);
      } else {
        res.status(404).json({ message: 'No quizzes found' });
      }
    }
  } else if (req.method === 'POST') {
    const id = parseInt(req.query.id as string);
    const answer: QuizAnswer = req.body;

    // Find the corresponding quiz question
    const question: Question | null = await buildQuestion(id);
    if (!question) res.status(404).json({ message: 'Quiz question not found' });

    const isCorrect = checkAnswer(question!, answer.answer);
    console.log(question, answer, isCorrect);

    if (isCorrect) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } else {
    res.status(405).end();
  }
}


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
          question.correct_answers.push(choices[i].option_id.toString());
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

// Define a helper function to build all quizzes
async function buildAllQuizzes(): Promise<Quiz[]> {
  let i = 1,
    quizzes: Quiz[] = [],
    quiz = await buildQuiz(i);
  while (i < 10 && quiz) {
    quizzes.push(quiz);
    i++;
    quiz = await buildQuiz(i);
  }
  return quizzes;
}