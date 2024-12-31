import { Router } from 'express';
import { Database } from 'bun:sqlite';
import config from 'config';

const router = Router();
const db = new Database(config.db_filename);

router.get('/users', (req, res) => {
  const stmt = db.query('SELECT id, name, email FROM users');
  const users = stmt.all();

  res.status(200).json(users);
});

router.get('/users/:id', (req, res) => {
  const stmt = db.query('SELECT id, name, email FROM users WHERE id = ?');
  const user = stmt.get(req.params.id);

  res.status(200).json(user);
});

router.post('/users', (req, res) => {
  const stmt = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
  );
  stmt.run(req.body.name, req.body.email, req.body.password);

  res
    .status(201)
    .json({ name: req.body.name, message: 'User created successfully' });
});

router.patch('/users/:id', (req, res) => {
  const stmt = db.prepare(
    'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
  );
  stmt.run(req.body.name, req.body.email, req.body.password, req.params.id);

  res
    .status(200)
    .json({ name: req.body.name, message: 'User updated successfully' });
});

export default router;
