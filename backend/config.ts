declare module 'bun' {
  interface Env {
    PORT: string;
    JWT_SECRET: string;
    FRONTEND_URL: string;
  }
}

const {
  PORT: port,
  JWT_SECRET: jwtSecret,
  FRONTEND_URL: frontend_url,
} = process.env;

export default {
  port,
  jwtSecret,
  db_filename: 'database.sqlite',
  frontend_url,
};
