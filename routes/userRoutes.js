const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../controllers/helpers');
const { RegisterController, LoginController } = require('../controllers/userControllers');
const passport = require('passport');

module.exports = (app) => {
    app.post('/api/user/register', RegisterController);

    app.post('/api/user/login', LoginController);

    app.get('/api/user/validate', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json('Authorized');
    });
};
