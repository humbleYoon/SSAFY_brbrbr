const successCode = 1124;

module.exports.function = function checkAuthenticationCode (authenticationCode) {
  var ret = "";
  if (authenticationCode == successCode) ret = "Success";
  else ret = "Failure";
  return ret;
}
