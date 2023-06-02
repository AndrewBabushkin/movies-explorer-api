const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getUser, updateUserInfo } = require('../conrollers/users');
const { updateProfileValidation } = require('../middlewares/routesValidation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateUserInfo);

module.exports = usersRouter;
