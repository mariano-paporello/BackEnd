import knex from "knex";

const dbMariaDb = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'mariano',
      port: 3306
    },
  });
  
export default dbMariaDb