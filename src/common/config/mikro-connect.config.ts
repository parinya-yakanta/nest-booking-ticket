import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Logger } from '@nestjs/common';

export default () => ({
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
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  logger: (message: string) => Logger.log(message),
  // allowGlobalContext: true,
  // registerRequestContext: false,
});
