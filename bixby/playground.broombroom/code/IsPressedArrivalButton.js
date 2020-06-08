var console = require('console');
var http = require('http');
var fail = require('fail');
var config = require('config');
const baseURL = config.get("baseURL");

module.exports.function = function isPressedArrivalButton (arrivalButtonState, order) {
  // if (arrivalButtonState == "정지") {
  //   return "정지"
  // }

  // 로봇 상태 정보(대기, 이동중, 도착)에 대해 요청한다.
  var result;
  var response;
  var url = baseURL + "/robots/arrived";
  var authCode = order.authenticationState.authenticationCode.toString();
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: {
      'authCode': authCode
    }
  };
  response = http.getUrl(url, options);
  // console.log(response);

  if (response){
    if (response.isArrived == true) {
      result = "도착";
    }
    else {
      result = "이동중";
    }
    
  }
  else {
    throw fail.checkedError("NoResult", "NoResult")
  }

  return result
}
