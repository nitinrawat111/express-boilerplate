import morgan from 'morgan';
import logger from '../utils/logger.js';

const logFormat = process.env.NODE_ENV == "dev" ?
                "dev" : 
                ":remote-addr - :remote-user [:date[clf]] \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\" - :response-time ms";


const morganMiddleware = morgan(
    logFormat,
   
    // Options
    {
        // Use winston logger as stream
        stream: {
            write: (message) => logger.http(message),
        }
    }
);

export default morganMiddleware;