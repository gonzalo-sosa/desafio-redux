import { CardController } from '@/controllers/cardController';
import config from 'config';
import { Router } from 'express';
import { Database } from 'bun:sqlite';

const router = Router();
const db = new Database(config.db_filename);
const cardController = new CardController(db);

router.get('/cards', (req, res) => {
  const { error, data } = cardController.getCards();

  if (error) {
    return res.status(400).send(error);
  }

  const { cards } = data;

  res.status(200).json({ cards, message: 'Cards retrieved successfully' });
});

router.get('/cards/:id', (req, res) => {
  const { error, data } = cardController.getCardById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(200).json({ card, message: 'Card retrieved successfully' });
});

router.post('/cards', (req, res) => {
  const { error, data } = cardController.createCard(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(201).json({ card, message: 'Card created successfully' });
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

  res.status(200).json({ card, message: 'Card updated successfully' });
});

router.delete('/cards/:id', (req, res) => {
  const { error, data } = cardController.deleteCard({ id: req.params.id });

  if (error) {
    return res.status(400).send(error);
  }

  const { card } = data;

  res.status(200).json({ card, message: 'Card deleted successfully' });
});

export default router;
