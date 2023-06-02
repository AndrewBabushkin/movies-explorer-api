const loginRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { login } = require('../conrollers/users');
const { singinValidation } = require('../middlewares/routesValidation');

loginRouter.post('/', celebrate(singinValidation), login);

module.exports = loginRouter;
