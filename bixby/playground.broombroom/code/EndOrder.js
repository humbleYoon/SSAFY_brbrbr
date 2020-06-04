var console = require('console');
var http = require('http');
var fail = require('fail');
var config = require('config');
const baseURL = config.get("baseURL");

module.exports.function = function cancelOrder (order) {
  // 백엔드에 커넥션 종료를 요청한다.
  var url = baseURL + "/robots/finished";
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: order.authenticationState.authenticationCode
  };
  response = http.getUrl(url, options);
  // console.log(response)
  
  if(!response) {
    throw fail.checkedError("NoResult", "NoResult")
  }

  return order
}
