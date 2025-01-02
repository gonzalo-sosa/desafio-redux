// modelo de usuarios (nombre, email, contraseña, etc)

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
  ) {}
}
