const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

// EXPRESS RESPONSE PARSIN
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PASSPORT CONFIG
app.use(passport.initialize());
require('./config/passport')(passport);

// DATABASE CONNECTION
mongoose
    .connect(process.env.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('db connected...'))
    .catch((err) => console.log(err));

// SPIN UP SERVER
app.listen(PORT, () => console.log(`server up at PORT:${PORT}`));
