const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes')

// Middleware
// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// testing
app.use('/', (req, res ) => {
  res.send('<h1>CHULO</h1>');
});

// Api Route
// app.use("/api/v1", routes.api);
app.use("/api/v1/auth", routes.auth);

app.listen( PORT, () => console.log(`Server connected at http://localhost:${PORT}`));