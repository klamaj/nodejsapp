require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const UserModel = require('./models/user');

require('./auth/auth');
const routes = require('./routes/blog');
const secureRoute = require('./routes/secure-routes');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
    .then(() => {
        log(chalk.green("Connected to database!"));
    })
    .catch(() => {
        log(chalk.red("Connection failed!"));
    });
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});
