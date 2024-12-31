// modelo de usuarios (nombre, email, contraseña, etc)

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}
