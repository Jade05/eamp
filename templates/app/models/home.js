import BaseModel from './base'

class HomeModel extends BaseModel {
  constructor (request) {
    super(request)
  }
  
  async getListData(params) {
    
    return await this.invoke('GetListData', params)
  }
}

export default HomeModel
