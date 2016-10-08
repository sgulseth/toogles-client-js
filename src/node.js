require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = require('./client')(fetch);
