import express from 'express'
import convert from '../middlewares/convert'
import * as controllersHome from '../controllers/home'
import * as controllersAPI from '../controllers/api'

const router = express.Router()

router.get('/', convert(
  controllersHome.index
))

router.get('/api/getListData', convert(controllersAPI.getListData))

export default router
