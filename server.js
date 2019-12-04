const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes')

// ---------------- Middleware --------------- //
// Session
// app.use(
//   session({
//     store: new MongoStore({ url: process.env.MONGODB_URI }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.use(
  session({
  // Store session in DB
  store: new MongoStore({ url: process.env.MONGO_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Only create session if a propery has been added to session,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,  // Expire at 2 weeks
  }
}));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Api Route
// app.use("/api/v1", routes.api);
app.use("/api/v1/auth", routes.auth);

app.listen( PORT, () => console.log(`Server connected at http://localhost:${PORT}`));