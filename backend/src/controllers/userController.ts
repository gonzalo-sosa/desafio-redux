import { User } from '@/models/userModel';
import { Database } from 'bun:sqlite';

export class UserController {
  constructor(private db: Database) {}

  createUser(user: { name: string; email: string; password: string }) {
    const stmt = this.db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    );
    try {
      const queryResult = stmt.run(user.name, user.email, user.password);
      return {
        error: null,
        data: {
          user: {
            id: queryResult.lastInsertRowid,
            name: user.name,
            email: user.email,
          },
        },
      };
    } catch (error) {
      return {
        error: { message: 'User already exists' },
        data: null,
      };
    }
  }

  deleteUser(user: { id: string }) {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    try {
      stmt.run(Number(user.id));

      return {
        error: null,
        data: { user },
      };
    } catch (error) {
      return {
        error: { message: 'User not found' },
        data: null,
      };
    }
  }

  updateUser(user: {
    id: number;
    name: string;
    email: string;
    newPassword: string;
  }) {
    const stmt = this.db.prepare(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
    );

    try {
      stmt.run(user.name, user.email, user.newPassword, user.id);

      return {
        error: null,
        data: { user },
      };
    } catch (error) {
      return {
        error: { message: 'User not found' },
        data: null,
      };
    }
  }

  getUserById(id: string | number) {
    const stmt = this.db.query('SELECT * FROM users WHERE id = ?').as(User);
    const user = stmt.get(Number(id));

    return {
      error: null,
      data: { user },
    };
  }

  getUserByEmail(email: string) {
    const stmt = this.db.query('SELECT * FROM users WHERE email = ?').as(User);
    const user = stmt.get(email);

    return {
      error: null,
      data: { user },
    };
  }

  getUsers() {
    const stmt = this.db.query('SELECT * FROM users').as(User);
    const users = stmt.all();

    return {
      error: null,
      data: { users },
    };
  }
}
