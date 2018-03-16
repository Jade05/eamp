'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _header = require('./common/header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./common/footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const index = exports.index = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {

    Object.assign(_config2.default, {
      cssLink: '/m/eamp/dist/assets/css/home.css'
    });

    const data = {
      config: _config2.default,
      pageMeta: {
        lang: '',
        name: 'home',
        title: '',
        desc: '',
        keywords: ''
      },
      headerData: _header2.default.getHeaderData(req),
      footerData: _footer2.default.getFooterData(req),
      carouselData: {
        bannerImages: [{
          imageSrc: 'http://img.glzy8.com/upfiles/www/ppt/jpg/48645.jpg'
        }, {
          imageSrc: 'http://pic1.ytqmx.com:82/2015/0717/06/01.jpg!960.jpg'
        }]
      },
      listUrl: '/m/eamp/api/getListData'
    };

    res.render('home', { appData: data });
    yield next();
  });

  return function index(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();