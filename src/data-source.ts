import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {
  AuthToken,
  Board,
  BoardRole,
  Comment,
  List,
  Notification,
  Task,
  User,
} from './entities';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Board,
    List,
    Task,
    Comment,
    Notification,
    BoardRole,
    AuthToken,
  ],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
