var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, changedItem, destination, currentRobotState) {
  var nextOrder = order;

  if (order.step == "인증") {
    // 백엔드와 authenticationCode로 통신 후 결과 처리
    nextOrder.authenticationState = changedAuthenticationState;
    if (changedAuthenticationState.isAuthenticated) {
      nextOrder.step = "가이드 타입 선택"
    }
    console.log(nextOrder);
  }
  else if (order.step == "가이드 타입 선택") {
    
    nextOrder.step = "안내"

    nextOrder.item = changedItem;
    console.log(nextOrder);
  }
  else if (order.step == "안내") {
    nextOrder.destination = destination
    nextOrder.step = "이동중"
    nextOrder.pressedCount = 0
  }
  else if (order.step == "이동중") {
    if (currentRobotState == "도착") {
      nextOrder.step = "도착"
    }
    else{
      nextOrder.pressedCount += 1
    }
  }
  
  return nextOrder;
}
