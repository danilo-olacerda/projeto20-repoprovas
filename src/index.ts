import express from 'express';
import cors from 'cors';
import doenv from 'dotenv';
import 'express-async-errors';
import { errorHandlerMiddleware } from './middlewares/errorMiddleware';
import routes from './routes/routes';

doenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandlerMiddleware);

export default app;