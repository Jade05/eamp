function getHeaderData(req, extendData) {

  const headerData = {
    text: 'Hello header'
  }

  Object.assign(headerData, extendData)

  return headerData
}

export default {
  getHeaderData,
}

