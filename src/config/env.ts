import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  seedPath: process.env.DB_SEED,
  initilize: process.env.DB_INITIALIZE,
  frontendURL: process.env.FRONTEND_URL,
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydb',
  }
};