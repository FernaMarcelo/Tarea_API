import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './src/config';

export const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: './main.db',
  },
  migrations: {
    directory: 'src/database/migrations',
    tableName: 'migrations',
    // stub: 'src/database/stubs',
  },
  seeds: {
    directory: 'src/database/seeds',
    // stub: 'src/database/stubs',
  },
};
