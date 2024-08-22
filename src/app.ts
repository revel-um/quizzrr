import express from 'express';
import quizRoutes from './routes/quizRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Routes for quiz-related endpoints
app.use('/api', quizRoutes);

// Custom error handler to catch and respond to errors
app.use(errorHandler);

export default app;
