var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, addGuideType, searchTerm, isArrived) {
  var nextOrder = order;

  if (changedAuthenticationState != undefined) {
    // 백엔드와 authenticationCode로 통신 후 결과 처리
    const retState = {
      authenticationCode: changedAuthenticationState.authenticationCode,
      isAuthenticated: changedAuthenticationState.authenticationCode == 1124,
    };
      
    nextOrder.authenticationState = retState;
    console.log(nextOrder);
  }
  
  return nextOrder;
}
