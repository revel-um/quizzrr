// controllers/quizController.ts

import { Request, Response } from 'express';
import * as quizService from '../services/quizService';
import { literals } from '../constants/literals';
import { controller } from '../helpers/controllerHandler';
import { errorResponse, successResponse } from '../helpers/responses';

/**
 * Controller for creating a new quiz.
 * Accepts quiz title and questions from the request body, creates a new quiz, 
 * and returns the created quiz as a response.
 */
export const createQuiz = controller((req: Request, res: Response) => {
    const { title, questions } = req.body;
    const quiz = quizService.createQuiz(title, questions);
    successResponse(res, 201, quiz);  // Send success response with created quiz
});

/**
 * Controller for fetching a quiz by its ID.
 * If the quiz exists, it returns the quiz without the correct answers.
 * If the quiz is not found, it returns a 404 error response.
 */
export const getQuiz = controller((req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = quizService.getQuiz(id);
    
    if (!quiz) {
        return errorResponse(res, 404, { message: literals.quizNotFound });  // Send error response if quiz not found
    }

    // Return the quiz without revealing the correct answers
    const quizWithoutAnswers = {
        ...quiz,
        questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options,
        })),
    };
    
    successResponse(res, 200, quizWithoutAnswers);  // Send success response with quiz details
});

/**
 * Controller for submitting an answer to a specific question in a quiz.
 * Accepts quiz ID, question ID, and the selected option from the request body.
 * It processes the answer and returns whether the answer is correct and the correct answer if incorrect.
 */
export const submitAnswer = controller((req: Request, res: Response) => {
    const { quizId, questionId, selectedOption } = req.body;
    const { userId } = req.params;

    const result = quizService.submitAnswer(quizId, userId, questionId, selectedOption);
    successResponse(res, 200, result);  // Send success response with the result of the answer submission
});

/**
 * Controller for fetching the results of a quiz for a specific user.
 * Returns the quiz results including the user's score and their answers.
 * If results are not found, it returns a 404 error response.
 */
export const getResults = controller((req: Request, res: Response) => {
    const { quizId, userId } = req.params;
    const result = quizService.getResults(quizId, userId);
    
    if (!result) {
        return errorResponse(res, 404, { message: literals.resultNotFound });  // Send error response if results not found
    }

    successResponse(res, 200, result);  // Send success response with the quiz results
});
