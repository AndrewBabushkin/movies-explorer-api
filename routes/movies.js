const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { createMovie, getMovie, deleteMovie } = require('../conrollers/movies');
const checkRightsDeleteMovie = require('../middlewares/checkRightsDeleteMovie');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/routesValidation');

moviesRouter.get('/', getMovie);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.delete(
  '/:movieId',
  celebrate(deleteMovieValidation),
  checkRightsDeleteMovie,
  deleteMovie,
);

module.exports = moviesRouter;
