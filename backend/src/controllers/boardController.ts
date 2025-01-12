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

  getBoardsByUserId(userId: string | number) {
    const stmt = this.db
      .query('SELECT id, title FROM boards WHERE user_id = ?')
      .as(Board);
    const boards = stmt.all(Number(userId));

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
    error: null | { message: string };
    data: null | { board: Board };
  } {
    if (!title) {
      return {
        error: { message: 'Title is required' },
        data: null,
      };
    }

    const userController = new UserController(this.db);
    const stmt = this.db.query(
      'INSERT INTO boards (title, user_id) VALUES (?, ?)',
    );
    let boardId, userId, queryResult;

    if (!userEmail) {
      return {
        error: { message: 'User not found' },
        data: null,
      };
    }

    const { error, data } = userController.getUserByEmail(userEmail);

    if (error) {
      return {
        error: { message: 'User not found' },
        data: null,
      };
    }

    const { user } = data;

    if (!user) {
      return {
        error: { message: 'User not found' },
        data: null,
      };
    }

    userId = user.id;
    queryResult = stmt.run(title, user.id);
    boardId = queryResult.lastInsertRowid as number;

    return {
      error: null,
      data: { board: { id: boardId, title, user_id: userId } },
    };
  }

  updateBoard(board: { id: string | number; title: string }) {
    const stmt = this.db.prepare('UPDATE boards SET title = ? WHERE id = ?');
    stmt.run(board.title, Number(board.id));

    return {
      error: null,
      data: {
        board: { id: Number(board.id), title: board.title },
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
