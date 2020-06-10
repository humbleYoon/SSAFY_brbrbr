var console = require('console');
var http = require('http');
var fail = require('fail');
var secret = require('secret');
const baseURL = secret.get("baseURL");

module.exports.function = function getAuthenticationState (authenticationCode) {
  // 서버에 사용자가 입력한 인증번호의 유효성 유무를 요청한다.
  if (authenticationCode != undefined) {
    var url = baseURL + "/robots/auth";

    var data = {
      "inputAuthenticationCode": authenticationCode
    };

    var options = {
      passAsJson: true,
      returnHeaders: true,
      format: 'json',
    };

    var response = http.postUrl(url, data, options);
    // console.log(response)
  }
  
  if (response) {
    var authenticationState = {
      authenticationCode: authenticationCode,
      isAuthenticated: response.parsed.isAuthenticated,
      floor: !!response.parsed.floor ? response.parsed.floor : -999
    };
  }
  else {
    throw fail.checkedError("NoResult", "NoResult")
  }

  return authenticationState
}
