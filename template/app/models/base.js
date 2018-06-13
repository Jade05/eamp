import request from 'request'

import API_NAMES from '../constants/api'
import config from '../config'
import mockup from '../mockup'

class BaseModel {
  constructor (req) {
    this.req = req
  }

  async invoke(apiname, params, method = 'POST') {
    let url = API_NAMES[apiname]

    if (!url) {
      throw (`API: ${apiname} is invalid`)
    }

    return new Promise(async (resolve, reject) => {

      if (config.env.to !== 'PRO' && config.env.to !== 'PROD') {
        resolve(mockup[apiname])
        return
      }

      this._beforeInvoke(url, params, method)

      request({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }, (err, response, body) => {
        if (err) {
          this._afterErrorInvoke(url, params, method, err)
          throw(err)
        }

        const data = JSON.parse(body)

        this._afterSuccessInvoke(url, params, response, method)

        resolve(data)
      })
    })
  }

  _beforeInvoke (url, params, method) {
    this._send({
      method: `Request: ${url} ${method}`,
      params: JSON.stringify(params)
    })
  }

  _afterSuccessInvoke (url, request, response, method) {
    this._send({
      method: `Response: ${url} ${method}`,
      response
    })

    console.log(
      `[api] ${url} ${method}`,
      `Request: ${JSON.stringify(request)}`,
      `Response: ${JSON.stringify(response)}`
    )
  }

  _afterErrorInvoke (url, request, method, error) {
    this._send({
      method,
      error: error
    })

    console.log(
      `[api] ${url} ${method}`,
      `Request: ${JSON.stringify(request)}`,
      `ErrorMessage: ${error}`
    )
  }

  _send (logInfo) {
    /**
     * 发送日志统计
     */
  }
}

export default BaseModel
