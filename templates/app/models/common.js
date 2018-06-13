import BaseModel from './base'

class IpInfoModel extends BaseModel {
  constructor (request) {
    super(request)
  }

  async GetIpInfo() {
    return await this.invoke('getIpInfo', {})
  }

}

export default {
  IpInfoModel,
}
