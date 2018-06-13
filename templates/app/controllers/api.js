import enablecros from '../helpers/enablecros'

export const getListData = async (req, res) => {
  const result = await req.homeModel.getListData({})

  enablecros(req, res, req.headers.host)
  
  res.json(result)
}
