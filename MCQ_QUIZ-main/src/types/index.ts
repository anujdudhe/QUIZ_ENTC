/**
 * Type definitions for the MCQ Exam Application
 */

export interface Question {
  id: number;
  chapter: string; // e.g., "UNIT 1", "UNIT 2"
  question: string;
  options: string[];
  answerIndex: number; // zero-based index of correct option
}

export interface UserAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  correctIndex: number;
}

export type QuestionStatus = 'unanswered' | 'answered' | 'skipped';

export interface QuestionState {
  questionId: number;
  status: QuestionStatus;
  selectedIndex?: number;
  isCorrect?: boolean;
}

export interface Chapter {
  id: string;
  name: string;
  description?: string;
}

export type AppState = 
  | { stage: 'chapterSelect' }
  | { stage: 'intro'; chapter: string }
  | { stage: 'exam'; chapter: string; currentQuestionIndex: number }
  | { stage: 'result'; chapter: string };

export interface ExamResults {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  answers: UserAnswer[];
  completedAt: string;
}
