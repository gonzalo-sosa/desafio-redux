import { Database } from 'bun:sqlite';
import config from 'config';

const initializeDatabase = () => {
  const db = new Database(config.db_filename, { create: true });

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS boards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      user_id INTEGER NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user_assigned_to_board (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      board_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (board_id) REFERENCES boards (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      board_id INTEGER NOT NULL,
      FOREIGN KEY (board_id) REFERENCES boards (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NULL,
      list_id INTEGER NOT NULL,
      FOREIGN KEY (list_id) REFERENCES lists (id)
    )
  `);

  return db;
};

export default initializeDatabase;
