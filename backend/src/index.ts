import express from 'express';
import config from '../config';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import boardRouter from './routes/boardRoutes';
import initializeDatabase from './database';

const app = express();
const port = config.port || 8080;
const db = initializeDatabase();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(boardRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log('Server running on port ' + port);
});
