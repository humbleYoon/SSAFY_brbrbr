module.exports.function = function getAuthenticationState (authenticationCode) {
  var authenticationState = {
    authenticationCode: authenticationCode,
    isAuthenticated: authenticationCode == 1124,
    floor: 11,
  }
  
  return authenticationState
}
