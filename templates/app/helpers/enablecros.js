export default (req, res, origin, opt_exposeHeaders) => {

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Expose-Headers',
    ['AMP-Access-Control-Allow-Source-Origin'].concat(opt_exposeHeaders || []).join(', '))

  if (req.query.__amp_source_origin) {
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', req.query.__amp_source_origin)
  }
}
