const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { dbURI, port } = require('./config/environment');
const router = require('./config/router');

const app = express();

app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => console.log(`Give us your money on port ${port}`));

module.exports = app;
