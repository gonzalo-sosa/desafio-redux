import { Database } from 'bun:sqlite';

export class ListController {
  constructor(private db: Database) {}

  getLists() {
    const stmt = this.db.prepare('SELECT * FROM lists');
    const lists = stmt.all();

    return {
      error: null,
      data: { lists },
    };
  }

  getListById(id: string) {
    const stmt = this.db.prepare('SELECT * FROM lists WHERE id = ?');
    const list = stmt.get(id);

    return {
      error: null,
      data: { list },
    };
  }

  createList({ title, board_id }: { title: string; board_id: string }) {
    const stmt = this.db.prepare(
      'INSERT INTO lists (title, board_id) VALUES (?, ?)',
    );
    const id = stmt.run(title, Number(board_id)).lastInsertRowid;

    return {
      error: null,
      data: { list: { id, title, board_id: Number(board_id) } },
    };
  }

  updateList({ id, title }: { id: number; title: string }) {
    const stmt = this.db.prepare('UPDATE lists SET title = ? WHERE id = ?');
    stmt.run(title, id);

    return {
      error: null,
      data: { list: { id, title } },
    };
  }

  deleteList(list: { id: string }) {
    const stmt = this.db.prepare('DELETE FROM lists WHERE id = ?');
    stmt.run(Number(list.id));

    return {
      error: null,
      data: { list: { id: Number(list.id) } },
    };
  }
}