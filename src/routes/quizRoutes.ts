import { Router } from 'express';
import { createQuiz, getQuiz, submitAnswer, getResults } from '../controllers/quizController';
import { createQuizValidator, getQuizValidator, getResultValidator, submitAnswerValidator } from '../validators/quizValidator';

const router = Router();

router.post('/quiz', createQuizValidator, createQuiz);
router.get('/quiz/:id', getQuizValidator, getQuiz);
router.post('/quiz/answer/:userId', submitAnswerValidator, submitAnswer);
router.get('/quiz/:quizId/results/:userId', getResultValidator, getResults);

export default router;
