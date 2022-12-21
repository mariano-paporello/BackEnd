const mongoose = require("mongoose")

const connectionString = "mongodb+srv://mariano:zRzWPTFXf3MKeZvf@freecluster.eclcymm.mongodb.net/?retryWrites=true&w=majority";

const initMongoDB = async () => {
  try {
    console.log('CONECTANDO A MI DB');
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('YA ESTOY CONECTADO')
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};


module.exports= initMongoDB 