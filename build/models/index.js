'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inject = (req, modelName, className) => {
  let value = null;
  Object.defineProperty(req, modelName, {
    get: function () {
      if (!value) {

        if (Object.keys(className) && Object.keys(className).length) {
          value = {};

          Object.keys(className).forEach(item => {
            value[item] = new className[item](req);
          });
        } else {
          value = new className(req);
        }
      }
      return value;
    }
  });
};

exports.default = (req, res, next) => {

  inject(req, 'homeModel', _home2.default);
  inject(req, 'commonModels', _common2.default);

  return next();
};