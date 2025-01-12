import { Router } from 'express';
import { Database } from 'bun:sqlite';
import config from 'config';
import { BoardController } from '@/controllers/boardController';
import { UserController } from '@/controllers/userController';

const router = Router();
const db = new Database(config.db_filename);
const boardController = new BoardController(db);
const userController = new UserController(db);

router.get('/boards', (req, res) => {
  if (!req.query.user_email)
    return res.status(400).send('user_email is required');

  const { error: userError, data: userData } = userController.getUserByEmail(
    req.query.user_email.toString(),
  );
  if (userError) {
    return res.status(400).send(userError);
  }

  const { user } = userData;

  if (!user) {
    return res.status(404).send('User not found');
  }

  const { id: userId } = user;
  const { error: boardError, data: boardData } =
    boardController.getBoardsByUserId(userId);

  if (boardError) {
    return res.status(400).send(boardError);
  }

  const { boards } = boardData;

  res.status(200).json(boards);
});

router.get('/boards/:id', (req, res) => {
  const { error, data } = boardController.getBoardById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { board } = data;

  res.status(200).json(board);
});

router.post('/boards', (req, res) => {
  const { error, data } = boardController.createBoard(req.body);

  if (error) {
    res.status(400).json(error);
    return;
  }

  const { board } = data;

  res.status(201).json(board);
});

router.patch('/boards/:id', (req, res) => {
  const { error, data } = boardController.updateBoard({
    ...req.body,
    id: req.params.id,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { board } = data;

  res.status(200).json(board);
});

router.delete('/boards/:id', (req, res) => {
  const { error, data } = boardController.deleteBoard({ id: req.params.id });

  if (error) {
    return res.status(400).send(error);
  }

  const { board } = data;

  res.status(200).json(board);
});

export default router;
