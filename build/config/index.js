'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let env = _package2.default.config && _package2.default.config.env && _package2.default.config.env.toUpperCase() || 'DEV';

const AppID = '';

const appConfigs = (() => {
  return {
    DEV: require('./dev').default,
    FAT: require('./fat').default,
    FWS: require('./fat').default,
    UAT: require('./uat').default,
    PRD: require('./prod').default,
    PRO: require('./prod').default,
    PROD: require('./prod').default
  }[env];
})();

exports.default = {
  env,
  AppID,
  appConfigs
};