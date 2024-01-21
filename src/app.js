const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const routes = require('./routes/index.js');
const task = require('./routes/routeTask.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use('/', routes);
app.use('/api', task);

// Error catching endware.
/* app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});  */

module.exports = app;

