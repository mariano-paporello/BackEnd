const server = require('./service/server');
const initMongoDB = require('./db/databaseMongoose')

const init = async () => {
  await initMongoDB();
  const puerto = 8080;

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
}

init();