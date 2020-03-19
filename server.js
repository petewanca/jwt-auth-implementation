const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

mongoose
    .connect(process.env.DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('db connected...'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server up at PORT:${PORT}`));
