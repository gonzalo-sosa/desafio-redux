import { Router } from 'express';
import { ListController } from '../controllers/listController';
import { Database } from 'bun:sqlite';
import config from 'config';
import { BoardController } from '@/controllers/boardController';
import { UserController } from '@/controllers/userController';

const router = Router();
const db = new Database(config.db_filename);
const listController = new ListController(db);

router.get('/lists', (req, res) => {
  if (!req.query.board_id) {
    return res.status(400).send('board_id is required');
  }

  const { error, data } = listController.getListsByBoardId(
    req.query.board_id.toString(),
  );

  if (error) {
    return res.status(400).send(error);
  }

  const { lists } = data;

  res.status(200).json(lists);
});

router.get('/lists/:id', (req, res) => {
  const { error, data } = listController.getListById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { list } = data;

  res.status(200).json(list);
});

router.post('/lists', (req, res) => {
  const { error, data } = listController.createList(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { list } = data;

  res.status(201).json(list);
});

router.patch('/lists/:id', (req, res) => {
  const { error, data } = listController.updateList({
    id: req.params.id,
    ...req.body,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { list } = data;

  res.status(200).json(list);
});

router.delete('/lists/:id', (req, res) => {
  const { error, data } = listController.deleteList({ id: req.params.id });

  if (error) {
    return res.status(400).send(error);
  }

  const { list } = data;

  res.status(200).json(list);
});

export default router;
