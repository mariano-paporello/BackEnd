const mongoose = require('mongoose');


const connectionString = "mongodb+srv://mariano:coderhouse@coderhouse2entrega.jgn5ucg.mongodb.net/CoderHouseDB?retryWrites=true&w=majority"||'mongodb://localhost:27017/CoderHouseDB';

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('YA ESTOY CONECTADO');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};


module.exports =  initMongoDB 