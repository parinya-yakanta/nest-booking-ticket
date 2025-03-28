import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Options } from '@mikro-orm/core';
import 'dotenv/config';

const config: Options = {
  driver: MySqlDriver,
  entities: ['dist/entities/**/*.entity.js'],
  entitiesTs: ['src/entities/**/*.entity.ts'],
  migrations: {
    path: './src/migrations',
    disableForeignKeys: false,
  },
  dbName: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  allowGlobalContext: true,
  debug: false,
  logger: (message: string) => Logger.log(message),
};

export default config;
