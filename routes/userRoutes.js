const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../controllers/helpers');
const { RegisterController, LoginController } = require('../controllers/userControllers');

module.exports = (app) => {
    app.post('/api/user/register', RegisterController);

    app.post('/api/user/login', LoginController);
};
