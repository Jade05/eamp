import http from 'http'
import path from 'path'

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import {errorHandler, fatalHandler} from './middlewares/error-handler'

import models from './models'
import routeHome from './routes/home'

import pkg from '../package.json'
import config from './config'

const initWebServer = () => {
  const app = express()

  app.use(compression())
  
  app.use('/dist', express.static(path.join(__dirname, '../dist')))

  app.enable('trust proxy')
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, './views'))
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParser())

  app.use(models)
  
  app.use((req, res, next) => {
    res.cookie('AMP_EXP', 'true,amp-date-picker')
    return next()
  })

  app.use('/', routeHome)

  app.use('/m/eamp/', routeHome)

  app.use(errorHandler)

  const server = http.createServer(app)
  const port = parseInt(pkg.config && pkg.config.port) || 3001

  server.on('error', fatalHandler)
  server.listen(port)
}

// 点火
const ignite = async () => {
  try {
    const date = +new Date()
    const timeout = setTimeout(() => {
      throw new Error('timeout? set up fail!')
    }, 30000)

    initWebServer()

    clearTimeout(timeout)
    console.log(`init success! set up timeout ${+new Date() - date}ms`)
  } catch (e) {
    console.log('init error~', e, e.stack)
    process.exit(1)
  }
}

ignite()
