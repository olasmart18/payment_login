const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const cookie = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const router = require('./router/authRoute');
const connect = require('./config/database');

const port = process.env.PORT || 5050;

const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

connect();

app.listen(port, () => console.log(`serving on port ${port}`));
