declare module 'bun' {
  interface Env {
    PORT: string;
    JWT_SECRET: string;
  }
}

const { PORT: port, JWT_SECRET: jwtSecret } = process.env;

export default {
  port,
  jwtSecret,
  db_filename: 'database.sqlite',
};
