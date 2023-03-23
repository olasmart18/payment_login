const express = require('express');
const bodyParser = require('body-parser');
// const cookie = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const router = require('./router/authRoute');
const connect = require('./config/database');

const port = process.env.PORT || 5050;

const app = express();
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.listen(port, () => console.log(`serving on port ${port}`));
