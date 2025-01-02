import { Router } from 'express';
import config from '../../config';
import { AuthController } from '@/controllers/authController';
import { UserController } from '@/controllers/userController';
import { Database } from 'bun:sqlite';

const router = Router();
const db = new Database(config.db_filename);
const userController = new UserController(db);
const authController = new AuthController();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const { error, data } = userController.createUser({ name, email, password });

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  const accessToken = authController.generateToken({ ...user }, '1d');

  res
    .status(201)
    .json({
      data: { ...data, jwt: accessToken },
      message: 'User registered successfully',
    });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { error, data } = userController.getUserByEmail(email);

  if (error) {
    return res.status(400).send(error);
  }

  const { user } = data;

  if (!user) {
    return res.status(404).send({ error: true, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).send({ message: 'Invalid password' });
  }

  const accessToken = await authController.generateToken({ email }, '1d');

  res.json({ data: { jwt: accessToken }, message: 'Login successful' });
});

export default router;
