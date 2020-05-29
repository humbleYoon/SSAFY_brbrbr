var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, changedItem, searchTerm, isArrived) {
  var nextOrder = order;

  if (order.step == "인증 페이지") {
    // 백엔드와 authenticationCode로 통신 후 결과 처리
    const retState = {
      authenticationCode: changedAuthenticationState.authenticationCode,
      isAuthenticated: changedAuthenticationState.authenticationCode == 1124,
    };

    if (changedAuthenticationState.authenticationCode == 1124) {
      nextOrder.step = "가이드 타입 선택 페이지"
    }

    nextOrder.authenticationState = retState;
    console.log(nextOrder);
  }
  else if (order.step == "가이드 타입 선택 페이지") {
    
    nextOrder.step = "안내 페이지"

    nextOrder.item = changedItem;
    console.log(nextOrder);
  }
  
  return nextOrder;
}
