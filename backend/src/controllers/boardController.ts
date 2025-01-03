import { Board } from '@/models/boardModel';
import { Database } from 'bun:sqlite';
import { UserController } from './userController';

export class BoardController {
  constructor(private db: Database) {}

  getBoards() {
    const stmt = this.db.query('SELECT id, title FROM boards').as(Board);
    const boards = stmt.all();

    return { error: null, data: { boards } };
  }

  getBoardById(id: string) {
    const stmt = this.db
      .query('SELECT id, title FROM boards WHERE id = ?')
      .as(Board);
    const board = stmt.get(Number(id));

    return { error: null, data: { board } };
  }

  createBoard({ title, userEmail }: { title: string; userEmail?: string }): {
    error: null | { value: true; message: string };
    data: null | { board: Board };
  } {
    if (!title) {
      return {
        error: { value: true, message: 'Title is required' },
        data: null,
      };
    }

    const userController = new UserController(this.db);
    const stmt = this.db.query(
      'INSERT INTO boards (title, user_id) VALUES (?, ?)',
    );
    let boardId, userId, queryResult;

    if (userEmail) {
      const { error, data } = userController.getUserByEmail(userEmail);

      if (error) {
        return {
          error: { value: true, message: 'User not found' },
          data: null,
        };
      }

      const { user } = data;

      if (!user) {
        queryResult = stmt.run(title, null);
      } else {
        userId = user.id;
        queryResult = stmt.run(title, user.id);
      }
    } else {
      queryResult = stmt.run(title, null);
    }

    boardId = queryResult.lastInsertRowid as number;

    return {
      error: null,
      data: { board: { id: boardId, title, user_id: userId || null } },
    };
  }

  updateBoard(board: { id: number; title: string }) {
    const stmt = this.db.prepare('UPDATE boards SET title = ? WHERE id = ?');
    stmt.run(board.title, board.id);

    return {
      error: null,
      data: {
        board,
      },
    };
  }

  deleteBoard(board: { id: string }) {
    const stmt = this.db.prepare('DELETE FROM boards WHERE id = ?');
    stmt.run(Number(board.id));

    return {
      error: null,
      data: {
        board: { id: Number(board.id) },
      },
    };
  }
}
