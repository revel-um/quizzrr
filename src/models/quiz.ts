export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOption: number;
  }
  
  export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
  }
  