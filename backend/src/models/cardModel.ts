// modelo de las tarjeta dentro de las listas de los tableros de trabajo (título, descripción, etc)

export class Card {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public listId: number,
  ) {}
}
