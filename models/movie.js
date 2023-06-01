const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Введите корректный URL',
      },
    },
    trailerLink: {
      type: String,
      require: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Введите корректный URL',
      },
    },
    thumbnail: {
      type: String,
      require: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Введите корректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      require: true,
    },
    nameRU: {
      type: String,
      require: true,
    },
    nameEN: {
      type: String,
      require: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
