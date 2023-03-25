const mongoose = require('mongoose');
const session = require('express-session');
const connectMongoSession = require('connect-mongodb-session')(session);
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

const store = new connectMongoSession({
  uri: process.env.MONGO_URI + db,
  collection: 'userSessions'
});

module.exports = { connect, store };
