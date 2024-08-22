import { celebrate, Joi, Segments } from 'celebrate';

/**
 * Validator for creating a new quiz.
 * Ensures that the request body contains a valid title and an array of questions.
 */
export const createQuizValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), // The title of the quiz, must be a non-empty string
        questions: Joi.array().items(
            Joi.object().keys({
                text: Joi.string().required(), // The text of the question, must be a non-empty string
                options: Joi.array().items(Joi.string().required()).length(4).required(), // An array of exactly 4 answer options, all required strings
                correctOption: Joi.number().integer().min(0).max(3).required(), // The index of the correct option, must be an integer between 0 and 3
            })
        ).min(1).required(), // At least one question is required
    }),
});

/**
 * Validator for retrieving a quiz by its ID.
 * Ensures that the request parameters contain a valid quiz ID.
 */
export const getQuizValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(), // The ID of the quiz to retrieve, must be a non-empty string
    }),
});

/**
 * Validator for submitting an answer to a question in a quiz.
 * Ensures that the request body and parameters contain valid quiz and answer information.
 */
export const submitAnswerValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        quizId: Joi.string().required(), // The ID of the quiz, must be a non-empty string
        questionId: Joi.string().required(), // The ID of the question being answered, must be a non-empty string
        selectedOption: Joi.number().required() // The index of the selected answer option, must be a number
    }),
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.string().required(), // The ID of the user submitting the answer, must be a non-empty string
    }),
});

/**
 * Validator for retrieving the results of a specific quiz for a user.
 * Ensures that the request parameters contain valid quiz and user IDs.
 */
export const getResultValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        quizId: Joi.string().required(), // The ID of the quiz, must be a non-empty string
        userId: Joi.string().required(), // The ID of the user, must be a non-empty string
    }),
});
