'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _convert = require('../middlewares/convert');

var _convert2 = _interopRequireDefault(_convert);

var _home = require('../controllers/home');

var controllersHome = _interopRequireWildcard(_home);

var _api = require('../controllers/api');

var controllersAPI = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/', (0, _convert2.default)(controllersHome.index));

router.get('/api/getListData', (0, _convert2.default)(controllersAPI.getListData));

exports.default = router;