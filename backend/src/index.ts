import express from 'express';
import config from '../config';
import cors from 'cors';
import initializeDatabase from './database';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import boardRouter from './routes/boardRoutes';
import listRouter from './routes/listRoutes';
import cardRouter from './routes/cardRoutes';

const app = express();
const port = config.port || 8080;
const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(boardRouter);
app.use(listRouter);
app.use(cardRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
