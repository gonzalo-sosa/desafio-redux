import { Router } from 'express';
import { Database } from 'bun:sqlite';
import config from 'config';

const router = Router();
const db = new Database(config.db_filename);

router.get('/boards', (req, res) => {
  const stmt = db.query('SELECT id, title FROM boards');
  const boards = stmt.all();

  res.status(200).json(boards);
});

router.get('/boards/:id', (req, res) => {
  const stmt = db.query('SELECT id, title FROM boards WHERE id = ?');
  const board = stmt.get(req.params.id);

  res.status(200).json(board);
});

router.post('/boards', (req, res) => {
  const stmt = db.prepare('INSERT INTO boards (title, user_id) VALUES (?, ?)');

  if (!req.body.title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  if (!req.body.user_id) {
    stmt.run(req.body.title);
  } else {
    stmt.run(req.body.title, req.body.user_id);
  }

  res
    .status(201)
    .json({ title: req.body.title, message: 'Board created successfully' });
});

router.patch('/boards/:id', (req, res) => {
  const stmt = db.prepare('UPDATE boards SET title = ? WHERE id = ?');
  stmt.run(req.body.title, req.params.id);

  res
    .status(200)
    .json({ title: req.body.title, message: 'Board updated successfully' });
});

export default router;
