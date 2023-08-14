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

export type { Question, Quiz, QuizAnswer, QuizOption, QuizQuestion };
