import pkg from '../../package.json'

let env = (pkg.config && pkg.config.env && pkg.config.env.toUpperCase()) || 'DEV'

const AppID = '{{APP_ID}}'

const appConfigs = (() => {
  return ({
    DEV: require('./dev').default,
    FAT: require('./fat').default,
    FWS: require('./fat').default,
    UAT: require('./uat').default,
    PRD: require('./prod').default,
    PRO: require('./prod').default,
    PROD: require('./prod').default,
  })[env]
})()

export default {
  env,
  AppID,
  appConfigs,
}
