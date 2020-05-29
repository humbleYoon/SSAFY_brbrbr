module.exports.function = function getAuthenticationState (authenticationCode) {
  var authenticationState = {
    authenticationCode: authenticationCode,
    isAuthenticated: false,
  }
  
  return authenticationState
}
