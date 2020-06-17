var console = require('console');
var http = require('http');
var fail = require('fail');
var secret = require('secret');
const baseURL = secret.get("baseURL");

module.exports.function = function isPressedArrivalButton (arrivalButtonState, order) {
  var result;
  var authCode = order.authenticationState.authenticationCode.toString();
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: {
      'authCode': authCode
    }
  };

  if (arrivalButtonState == "정지") {
    var urlStop = baseURL + "/robots/stop";
    var responseStop = http.getUrl(urlStop, options);
    // consol.log(responseStop);
    return "정지"
  }

  // 로봇 상태 정보(대기, 이동중, 도착)에 대해 요청한다.
  var url = baseURL + "/robots/arrived";
  var response = http.getUrl(url, options);
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
