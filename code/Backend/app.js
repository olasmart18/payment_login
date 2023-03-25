const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const router = require('./router/authRoute');
const { connect, store } = require('./config/database');

const port = process.env.PORT || 5050;

const app = express();

// ////set sessions and cookies for user auth //////
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  },
  store: store
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

connect();

app.listen(port, () => console.log(`serving on port ${port}`));
