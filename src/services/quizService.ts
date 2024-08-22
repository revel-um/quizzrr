// services/quizService.ts

import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question } from '../models/quiz';
import { Result } from '../models/result';
import { Answer } from '../models/answer';
import { literals } from '../constants/literals';

// In-memory storage for quizzes and results
const quizzes: Quiz[] = [];
const results: Result[] = [];

/**
 * Creates a new quiz with the given title and questions.
 * 
 * @param title - The title of the quiz.
 * @param questions - The list of questions to include in the quiz.
 * @returns The created Quiz object.
 */
export const createQuiz = (title: string, questions: Question[]): Quiz => {
    // Create unique IDs for each question and add them to the quiz
    const quizQuestions: Question[] = questions.map((question) => {
        return {
            id: uuidv4(),
            text: question.text,
            options: question.options,
            correctOption: question.correctOption,
        };
    });

    // Create a new quiz with a unique ID and the provided title and questions
    const quiz: Quiz = {
        id: uuidv4(),
        title,
        questions: quizQuestions,
    };

    // Store the quiz in the in-memory array
    quizzes.push(quiz);
    return quiz;
};

/**
 * Retrieves a quiz by its ID.
 * 
 * @param id - The ID of the quiz to retrieve.
 * @returns The Quiz object if found, otherwise undefined.
 */
export const getQuiz = (id: string): Quiz | undefined => {
    return quizzes.find(q => q.id === id);
};

/**
 * Submits an answer for a specific question in a quiz.
 * 
 * @param quizId - The ID of the quiz.
 * @param userId - The ID of the user submitting the answer.
 * @param questionId - The ID of the question being answered.
 * @param selectedOption - The index of the selected option.
 * @returns An object indicating if the answer was correct and the correct option if not.
 * @throws Error if the quiz or question is not found or if an answer is already submitted for the question.
 */
export const submitAnswer = (
    quizId: string,
    userId: string,
    questionId: string,
    selectedOption: number
): { isCorrect: boolean; correctOption?: number } => {
    // Find the quiz by ID
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) throw new Error(literals.quizNotFound);

    // Find the question within the quiz
    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) throw new Error(literals.questionNotFound);

    // Determine if the selected option is correct
    const isCorrect = question.correctOption === selectedOption;
    const answer: Answer = { questionId, selectedOption, isCorrect };

    // Find or create a result entry for the user
    let result = results.find(r => r.quizId === quizId && r.userId === userId);
    if (!result) {
        result = {
            quizId,
            userId,
            score: isCorrect ? 1 : 0,
            answers: [answer],
        };
        results.push(result);
    } else {
        // Check if an answer for the question already exists
        const existingAnswerIndex = result.answers.findIndex(a => a.questionId === questionId);

        if (existingAnswerIndex !== -1) {
            throw new Error(literals.answerAlreadyExists);
        } else {
            // Add the new answer and update the score if correct
            result.answers.push(answer);
            if (isCorrect) result.score += 1;
        }
    }

    // Return the result of the submitted answer
    return { isCorrect, correctOption: isCorrect ? undefined : question.correctOption };
};

/**
 * Retrieves the results for a specific quiz and user.
 * 
 * @param quizId - The ID of the quiz.
 * @param userId - The ID of the user.
 * @returns The Result object if found, otherwise undefined.
 */
export const getResults = (quizId: string, userId: string): Result | undefined => {
    return results.find(r => r.quizId === quizId && r.userId === userId);
};
