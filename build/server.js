'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _errorHandler = require('./middlewares/error-handler');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _home = require('./routes/home');

var _home2 = _interopRequireDefault(_home);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const initWebServer = () => {
  const app = (0, _express2.default)();

  app.use((0, _compression2.default)());

  app.use('/m/eamp/dist', _express2.default.static(_path2.default.join(__dirname, '../dist')));

  app.enable('trust proxy');
  app.set('view engine', 'ejs');
  app.set('views', _path2.default.resolve(__dirname, './views'));

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use((0, _cookieParser2.default)());

  app.use(_models2.default);

  app.use((req, res, next) => {
    res.cookie('AMP_EXP', 'true,amp-date-picker');
    return next();
  });

  app.use('/', _home2.default);

  app.use('/m/eamp/', _home2.default);

  app.use(_errorHandler.errorHandler);

  const server = _http2.default.createServer(app);
  const port = parseInt(_package2.default.config && _package2.default.config.port) || 3001;

  server.on('error', _errorHandler.fatalHandler);
  server.listen(port);
};

// 点火
const ignite = (() => {
  var _ref = _asyncToGenerator(function* () {
    try {
      const date = +new Date();
      const timeout = setTimeout(function () {
        throw new Error('timeout? set up fail!');
      }, 30000);

      initWebServer();

      clearTimeout(timeout);
      console.log(`init success! set up timeout ${+new Date() - date}ms`);
    } catch (e) {
      console.log('init error~', e, e.stack);
      process.exit(1);
    }
  });

  return function ignite() {
    return _ref.apply(this, arguments);
  };
})();

ignite();