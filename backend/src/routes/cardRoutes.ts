import { CardController } from '@/controllers/cardController';
import config from 'config';
import { Router } from 'express';
import { Database } from 'bun:sqlite';
import { UserController } from '@/controllers/userController';
import { ListController } from '@/controllers/listController';
import { BoardController } from '@/controllers/boardController';

const router = Router();
const db = new Database(config.db_filename);
const cardController = new CardController(db);

router.get('/cards', (req, res) => {
  if (!req.query.list_id) {
    return res.status(400).send('list_id is required');
  }

  const { error, data } = cardController.getCardsByListId(
    req.query.list_id.toString(),
  );

  if (error) {
    return res.status(400).send(error);
  }

  const { cards } = data;

  res.status(200).json(cards);
});

router.get('/cards/:id', (req, res) => {
  const { error, data } = cardController.getCardById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(200).json(card);
});

router.post('/cards', (req, res) => {
  const { error, data } = cardController.createCard(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(201).json(card);
});

router.patch('/cards/:id', (req, res) => {
  const { error, data } = cardController.updateCard({
    id: req.params.id,
    ...req.body,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(200).json(card);
});

router.delete('/cards/:id', (req, res) => {
  const { error, data } = cardController.deleteCard({ id: req.params.id });

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(200).json(card);
});

export default router;
