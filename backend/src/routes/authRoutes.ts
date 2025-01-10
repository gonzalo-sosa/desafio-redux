import { Router } from 'express';
import config from '../../config';
import { AuthController } from '@/controllers/authController';
import { UserController } from '@/controllers/userController';
import { Database } from 'bun:sqlite';

const router = Router();
const db = new Database(config.db_filename);
const userController = new UserController(db);
const authController = new AuthController();

router.options('/register', (req, res) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'x-auth-token');
  res.header('Access-Control-Allow-Origin', config.frontend_url);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

  res.status(200).send();
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const { error, data } = userController.createUser({
    name: email.split('@')[0],
    email,
    password,
  });

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  const accessToken = await authController.generateToken(
    { name: user.name, email: user.email },
    '1d',
  );

  res.status(201).json({ user, jwt: accessToken });
});

router.options('/login', (req, res) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'x-auth-token');
  res.header('Access-Control-Allow-Origin', config.frontend_url);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

  res.status(200).send();
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { error, data } = userController.getUserByEmail(email);

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (user.password !== password) {
    return res.status(401).send('Invalid password');
  }

  const accessToken = await authController.generateToken(
    { name: user.name, email },
    '1d',
  );

  res.status(200).json({ user, jwt: accessToken });
});

export default router;
