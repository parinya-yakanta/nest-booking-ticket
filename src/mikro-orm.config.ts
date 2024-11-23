import { Logger } from 'nestjs-pino';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { MySqlDriver } from '@mikro-orm/mysql';
import { Options } from '@mikro-orm/core';
import 'dotenv/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config: Options = {
  driver: MySqlDriver,
  entities: ['dist/entities/**/*.entity.js'],
  entitiesTs: ['src/entities/**/*.entity.ts'],
  migrations: { path: './src/migrations', disableForeignKeys: false },
  dbName: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  logger: (message: string) => console.log(message),
};

export default config;
