'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListData = undefined;

var _enablecros = require('../helpers/enablecros');

var _enablecros2 = _interopRequireDefault(_enablecros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getListData = exports.getListData = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const result = yield req.homeModel.getListData({});

    (0, _enablecros2.default)(req, res, req.headers.host);

    res.json(result);
  });

  return function getListData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();