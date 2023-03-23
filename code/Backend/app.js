const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`serving on port ${port}`));
