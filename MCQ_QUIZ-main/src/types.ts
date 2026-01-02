export interface Question {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface UserAnswer {
  questionId: number;
  selectedIndex: number; // -1 indicates skipped question
  isCorrect: boolean;
  correctIndex: number;
  isSkipped?: boolean; // Flag to indicate if the question was skipped
  chapter: string; // Associate answer with chapter/bank to avoid ambiguity when ids repeat
}

export interface QuestionState {
  questionId: number;
  status: 'unanswered' | 'answered' | 'marked' | 'skipped';
  isMarked?: boolean;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
}

export interface ExamResults {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  chapter: string;
  percentage: number;
  completedAt: number;
  answers?: UserAnswer[];
}

export type AppState = 
  | { 
      stage: 'chapterSelect';
    }
  | { 
      stage: 'exam'; 
      chapter: string; 
      currentQuestionIndex: number;
    }
  | { 
      stage: 'result'; 
      results: ExamResults;
    }
  | {
      stage: 'analysis';
      chapter: string;
    };
