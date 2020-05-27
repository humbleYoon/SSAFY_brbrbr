const successCode = 1124;

module.exports.function = function checkAuthenticationCode (authenticationCode) {
  var checkedAuthenticationCode = {
    authenticationCode: authenticationCode,
    isSuccess: authenticationCode == successCode,
  };
  return checkedAuthenticationCode;
}
