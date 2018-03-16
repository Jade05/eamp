import config from '../config'

import headerController from './common/header'
import footerController from './common/footer'

export const index = async (req, res, next) => {

  Object.assign(config, {
    cssLink: '/m/eamp/dist/assets/css/home.css'
  })

  const data = {
    config,
    pageMeta: {
      lang: '',
      name: 'home',
      title: '',
      desc: '',
      keywords: '',
    },
    headerData: headerController.getHeaderData(req),
    footerData: footerController.getFooterData(req),
    carouselData: {
      bannerImages: [{
        imageSrc: 'http://img.glzy8.com/upfiles/www/ppt/jpg/48645.jpg',
      }, {
        imageSrc: 'http://pic1.ytqmx.com:82/2015/0717/06/01.jpg!960.jpg',
      }]
    },
    listUrl: '/m/eamp/api/getListData',
  }

  res.render('home', {appData: data})
  await next()
}
