import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: isProduction
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: !isProduction,
      dialectOptions: isProduction
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    });

export default sequelize;
