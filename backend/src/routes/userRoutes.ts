import { Router } from 'express';
import { Database } from 'bun:sqlite';
import config from 'config';
import { UserController } from '@/controllers/userController';

const router = Router();
const db = new Database(config.db_filename);
const userController = new UserController(db);

router.get('/users', (req, res) => {
  const { error, data } = userController.getUsers();

  if (error) {
    return res.status(400).send(error);
  }

  const { users } = data;

  res.status(200).json(users);
});

router.get('/users/:id', (req, res) => {
  const { error, data } = userController.getUserById(req.params.id);

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  res.status(200).json(user);
});

router.post('/users', (req, res) => {
  const { error, data } = userController.createUser(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  res.status(201).json(user);
});

router.patch('/users/:id', (req, res) => {
  const { error, data } = userController.updateUser({
    id: Number(req.params.id),
    ...req.body,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  res.status(200).json(user);
});

router.delete('/users/:id', (req, res) => {
  const { error, data } = userController.deleteUser({ id: req.params.id });

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  res.status(200).json(user);
});

export default router;
