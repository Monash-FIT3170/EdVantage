enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  SHORT_ANSWER = 'short_answer',
}

type Quiz = {
  quiz_id: number;
  title: string;
  description: string;
  questions: Question[];
};

type Question = {
  question_id: number;
  question: string;
  question_type: QuestionType;
  correct_answers: string[];
  choices?: QuizOption[];
  //nextQuestionId?: number;
};

type QuizQuestion = {
  quiz_id: number;
  question_id: number;
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
};

type QuizAttempt = {
  attempt_id: number;
  user_id: string;
  quiz_id: number;
  title: string;
  percentage: number;
  timestamp: Date;
}

type QuizQuestionResult = {
  result_id: number;
  attempt_id: number;
  question_id: number;
  user_answer: string;
  array_agg: string;
  result: boolean;
  question: string;
  question_type: QuestionType;
}

export { Question, QuestionType, Quiz, QuizQuestion, QuizOption, QuizAnswer, QuizAttempt, QuizQuestionResult };
