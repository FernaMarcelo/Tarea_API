import Knex from 'knex';

const dbConnection = {
  client: 'sqlite3',
  connection: {
    filename: './main.db',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export const knex = () => Knex(dbConnection);
