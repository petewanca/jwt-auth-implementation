const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/keys');
const { registerValidation, loginValidation } = require('./helpers');

module.exports = {
    RegisterController: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        // #1 VALIDATE USER INFORMATION
        const { error } = await registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // #2 CHECK IF EMAIL ALREADY REGISTERED
        const emailRegistered = await User.findOne({ email });
        if (emailRegistered) return res.status(400).send('Email already in use.');

        // #3 ENCRYPT PASSWORD
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        // #4 CREATE USER TO SAVE TO DB
        const newUser = await new User({
            firstName,
            lastName,
            email,
            password: hash
        });

        // #5 ATTEMPT TO SAVE NEW USER
        try {
            await newUser.save();
            res.status(200).send(`Your email has been registered, ${firstName}!`);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    LoginController: async (req, res) => {
        const { email, password } = req.body;

        // #1 VALIDATE USER INFORMATION
        const { error } = await loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // #2 SEARCH FOR USER
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).send('Email or password is incorrect.');

        // #3 VALIDATE PASSWORDS MATCH
        const match = await bcrypt.compare(password, userFound.password);
        if (!match) return res.status(400).send('Email or password is incorrect.');

        // #4 CREATE PAYLOAD AND SIGN TOKEN TO USER
        const payload = {
            id: userFound._id,
            email: userFound.email
        };
        const token = await jwt.sign(payload, secret, { expiresIn: '1hr' });
        res.status(200).send({ token: `Bearer ${token}` });
    }
};
