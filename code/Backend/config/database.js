const mongoose = require('mongoose');
const db = 'userBD';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + db);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
    throw new Error('cannot connect to mongodb');
  }
};

module.exports = connect;
