var pkg = require('./package.json')

var env = (pkg.config && pkg.config.env && pkg.config.env.toUpperCase()) || 'DEV1'

env === 'DEV'
  ? module.exports = require('./app/config/index').default.appConfigs
  : module.exports = require('./build/config/index').default.appConfigs
