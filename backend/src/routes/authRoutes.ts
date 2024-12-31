import { Router } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const router = Router();

const users = [] as { username: string; password: string }[];

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });

  res.status(201).json({ username });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  if (user.password !== password) {
    return res.status(401).send('Invalid password');
  }

  const accessToken = await getToken({ username }, '1d');

  res.json({ accessToken });
});

const getToken = async (payload: JwtPayload, expiresIn?: string) => {
  const module = await import('jsonwebtoken');
  const token = module.sign(payload, config.jwtSecret, { expiresIn });

  return token;
};

export default router;
