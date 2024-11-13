import cors from 'cors';
import logger from './utils/logger.js';
import ApiError from './utils/ApiError.js';
import cookieParser from 'cookie-parser';
import ApiResponse from './utils/ApiResponse.js';
import v1Router from './routes/api/v1/v1.router.js';
import morganMiddleware from './middlewares/morgan.middleware.js';
import express, { NextFunction, Request, Response } from 'express';

////////////////////////////////////////////////////////////
// Express App Initialization
////////////////////////////////////////////////////////////
const app = express();

////////////////////////////////////////////////////////////
// Middlewares
////////////////////////////////////////////////////////////
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true   // To allow cookies
}));

////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////
app.use('/api/v1', v1Router);

////////////////////////////////////////////////////////////
// Error Handler
////////////////////////////////////////////////////////////
app.use((err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next(err);
    }

    if (err instanceof ApiError) {
        res.status(err.statusCode).json(new ApiResponse(err.statusCode, err.message, undefined, err.errors));
        logger.debug(err.stack);
    } else {
        // In case of any other error
        res.status(500).json(new ApiResponse(500, "Internal Server Error!"));
        logger.error(err.stack);
    }
});

////////////////////////////////////////////////////////////
// Server Initialization
////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server started on PORT: ${PORT}`);
});

////////////////////////////////////////////////////////////
// Exporting Express app for testing
////////////////////////////////////////////////////////////
export default app;