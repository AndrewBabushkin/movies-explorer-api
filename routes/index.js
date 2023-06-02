const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const regRouter = require('./signup');
const loginRouter = require('./signin');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/signup', regRouter);
router.use('/signin', loginRouter);

router.all('*', auth, (req, res, next) => {
  next(new DocumentNotFoundError('Страница не найдена!'));
});

module.exports = router;
