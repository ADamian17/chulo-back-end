const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes')

// ---------------- Middleware --------------- //

// CORS - ['Cross Origi Resource Sharing'] - Importante quitalo despues
const corsOptions = {
  origin: [`https://watchchulo.herokuapp.com`, `http://localhost:3000`], 
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Session
app.use(
  session({
  store: new MongoStore({ url: process.env.MONGODB_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,  // Expire at 2 weeks
  }
}));


// Routes
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/users", routes.users);
app.use("/api/v1/movies", routes.movies);

//heroku changes to server.js
app.listen(process.env.PORT || 4000, () => console.log(`Server connected at http://localhost:${PORT}`))