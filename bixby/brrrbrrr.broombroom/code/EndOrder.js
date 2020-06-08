var console = require('console');
var http = require('http');
var fail = require('fail');
var secret = require('secret');
const baseURL = secret.get("baseURL");

module.exports.function = function cancelOrder (order) {
  // 백엔드에 커넥션 종료를 요청한다.
  var url = baseURL + "/robots/finished";
  var authCode = order.authenticationState.authenticationCode.toString();
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: {
      'authCode': authCode
    }
  };
  response = http.getUrl(url, options);

  if (response.status == 200) return order;
  
  if(!response) {
    throw fail.checkedError("NoResult", "NoResult")
  }

  return order
}
