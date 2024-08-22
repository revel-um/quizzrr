import { Answer } from "./answer";

export interface Result {
  quizId: string;
  userId: string;
  score: number;
  answers: Answer[];
}  