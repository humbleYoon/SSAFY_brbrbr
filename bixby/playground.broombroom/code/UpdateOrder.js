var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, changedItem, destinations, currentRobotState, expectedStep) {
  var nextOrder = order;

  if (order.step == "인증" || order.step == "인증 실패") {
    // 백엔드와 authenticationCode로 통신 후 결과 처리
    nextOrder.authenticationState = changedAuthenticationState;
    if (changedAuthenticationState.isAuthenticated) {
      nextOrder.step = "가이드 타입 선택"
    }
    else {
      nextOrder.step = "인증 실패"
    }
    console.log(nextOrder);
  }
  else if (order.step == "가이드 타입 선택" || order.step == "도착") {
    if (nextStep == "안내") {

    }
    else if (nextStep == "이동중") {

    }
    else {

    }
    
    nextOrder.step = "안내"

    nextOrder.item = changedItem;
    console.log(nextOrder);
  }
  else if (order.step == "안내") {
    if (destinations.length == 0) {
      nextOrder.step = "없는 장소"
    }
    else if (destinations.length == 1) {
      if (destinations[0].floor == order.authenticationState.floor) {
        nextOrder.destinations = destinations
        nextOrder.step = "이동중"
        nextOrder.pressedCount = 0
      }
      else {
        nextOrder.step = "다른 층"
        nextOrder.destinations = destinations
      }
    }
    else {
      nextOrder.step = "다른 층"
      nextOrder.destinations = destinations
    }
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
