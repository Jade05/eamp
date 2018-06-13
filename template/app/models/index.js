
import HomeModel from './home'
import CommonModels from './common'

const inject = (req, modelName, className) => {
  let value = null
  Object.defineProperty(req, modelName, {
    get: function () {
      if (!value) {

        if (Object.keys(className) && Object.keys(className).length) {
          value = {}

          Object.keys(className).forEach(item => {
            value[item] = new className[item](req)
          })
        } else {
          value = new className(req)
        }
      }
      return value
    }
  })
}

export default (req, res, next) => {

  inject(req, 'homeModel', HomeModel)
  inject(req, 'commonModels', CommonModels)

  return next()
}
