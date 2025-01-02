// modelos de los tableros (nombre, descripción, etc)

export class Board {
  constructor(
    public id: number,
    public title: string,
    public user_id: number | null,
  ) {}
}
