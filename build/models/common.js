'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class IpInfoModel extends _base2.default {
  constructor(request) {
    super(request);
  }

  GetIpInfo() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return yield _this.invoke('getIpInfo', {});
    })();
  }

}

exports.default = {
  IpInfoModel
};