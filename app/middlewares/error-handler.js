import {env} from '../config'

export class ApiError extends Error {
    constructor (errno, message) {
      super()
      this.errno = errno
      this.message = message || ERROR_MESSAGE[errno] || 'Api Error!'
    }
  }
  
ApiError.PARAM_ILLEGAL = -1
ApiError.LOGIN_INVALID = -2

const ERROR_MESSAGE = {
    [ApiError.PARAM_ILLEGAL]: 'Params Illegal',
    [ApiError.LOGIN_INVALID]: 'Login Invalid',
}

export const errorHandler = (error, req, res, next) => {
  console.log(error, '--------------- error ------------------')

  const response = {
    errno: error.errno || error.code || 500,
    message: error.message || error.toString(),
  }

  if (env !== 'PROD') {
    response['stack'] = error.stack || 'can\'t trace error stack'
  }

  console.error(JSON.stringify(error))

  if (req.xhr || req.method === 'POST') {
    res.json(response)
  } else {
    res.status(404).end(JSON.stringify(response))
  }
}

export const fatalHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error('port requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error('port is already in use')
      process.exit(1)
    default:
      console.error(error)
      throw error
  }
}
