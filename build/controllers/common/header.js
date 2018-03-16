'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getHeaderData(req, extendData) {

  const headerData = {
    text: 'Hello header'
  };

  Object.assign(headerData, extendData);

  return headerData;
}

exports.default = {
  getHeaderData
};