'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _api = require('../constants/api');

var _api2 = _interopRequireDefault(_api);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _mockup = require('../mockup');

var _mockup2 = _interopRequireDefault(_mockup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class BaseModel {
  constructor(req) {
    this.req = req;
  }

  invoke(apiname, params, method = 'POST') {
    var _this = this;

    return _asyncToGenerator(function* () {
      let url = _api2.default[apiname];

      if (!url) {
        throw `API: ${apiname} is invalid`;
      }

      return new Promise((() => {
        var _ref = _asyncToGenerator(function* (resolve, reject) {

          if (_config2.default.env.to !== 'PRO' && _config2.default.env.to !== 'PROD') {
            resolve(_mockup2.default[apiname]);
            return;
          }

          _this._beforeInvoke(url, params, method);

          (0, _request2.default)({
            url: url,
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
          }, function (err, response, body) {
            if (err) {
              _this._afterErrorInvoke(url, params, method, err);
              throw err;
            }

            const data = JSON.parse(body);

            _this._afterSuccessInvoke(url, params, response, method);

            resolve(data);
          });
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      })());
    })();
  }

  _beforeInvoke(url, params, method) {
    this._send({
      method: `Request: ${url} ${method}`,
      params: JSON.stringify(params)
    });
  }

  _afterSuccessInvoke(url, request, response, method) {
    this._send({
      method: `Response: ${url} ${method}`,
      response
    });

    console.log(`[api] ${url} ${method}`, `Request: ${JSON.stringify(request)}`, `Response: ${JSON.stringify(response)}`);
  }

  _afterErrorInvoke(url, request, method, error) {
    this._send({
      method,
      error: error
    });

    console.log(`[api] ${url} ${method}`, `Request: ${JSON.stringify(request)}`, `ErrorMessage: ${error}`);
  }

  _send(logInfo) {
    /**
     * 发送日志统计
     */
  }
}

exports.default = BaseModel;