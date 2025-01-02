import { Router } from 'express';
import { Database } from 'bun:sqlite';
import config from 'config';
import { BoardController } from '@/controllers/boardController';

const router = Router();
const db = new Database(config.db_filename);
const boardController = new BoardController(db);

router.get('/boards', (req, res) => {
  const { error, data } = boardController.getBoards();

  if (error) {
    return res.status(400).send(error);
  }

  const { boards } = data;

  res.status(200).json(boards);
});

router.get('/boards/:id', (req, res) => {
  const { error, data } = boardController.getBoardById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { board } = data;

  res.status(200).json({ ...board, message: 'Board retrieved successfully' });
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
