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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;