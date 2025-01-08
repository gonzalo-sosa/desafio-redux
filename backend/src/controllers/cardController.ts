import { Card } from '@/models/cardModel';
import { Database } from 'bun:sqlite';

export class CardController {
  constructor(private db: Database) {}

  getCards() {
    const stmt = this.db.prepare('SELECT * FROM cards').as(Card);
    const cards = stmt.all();

    return {
      error: null,
      data: { cards },
    };
  }

  getCardById(id: string) {
    const stmt = this.db.prepare('SELECT * FROM cards WHERE id = ?');
    const card = stmt.get(Number(id));

    if (!card) {
      return {
        error: { value: true, message: 'Card not found' },
        data: null,
      };
    }

    return {
      error: null,
      data: { card },
    };
  }

  createCard({ title, list_id }: { title: string; list_id: number }) {
    const stmt = this.db.prepare(
      'INSERT INTO cards (title, list_id) VALUES (?, ?)',
    );
    const id = stmt.run(title, Number(list_id)).lastInsertRowid;

    return {
      error: null,
      data: { card: { id, title, list_id } },
    };
  }

  deleteCard(card: { id: string }) {
    const stmt = this.db.prepare('DELETE FROM cards WHERE id = ?');
    stmt.run(Number(card.id));

    return {
      error: null,
      data: { card },
    };
  }

  updateCard({
    id,
    title,
    description,
    list_id,
  }: {
    id: string;
    title: string;
    description: string;
    list_id: number;
  }) {
    const stmt = this.db.prepare(
      'UPDATE cards SET title = ?, description = ?, list_id = ? WHERE id = ?',
    );
    stmt.run(title, description, Number(list_id), Number(id));

    return {
      error: null,
      data: { card: { id: Number(id), title, description, list_id } },
    };
  }
}
