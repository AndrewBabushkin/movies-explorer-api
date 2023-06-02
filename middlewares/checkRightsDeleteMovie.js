const Movie = require('../models/movie');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const NoRightsError = require('../errors/NoRightsError');

const checkRightsDeleteMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.movieId)
    .then((card) => {
      if (!card) {
        throw new DocumentNotFoundError('Фильм с указанным _id не найден.');
      }
      const ownerId = card.owner.toString();

      if (ownerId !== userId) {
        throw new NoRightsError('У вас нет прав удалить данную карточку.');
      }
      next();
    })
    .catch(next);
};

module.exports = checkRightsDeleteMovie;
