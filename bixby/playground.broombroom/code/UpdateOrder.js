var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, changedItem, destinations, currentRobotState) {
  var beforeStep

  do {
    beforeStep = order.step
    if ((order.step == "인증" || order.step == "인증 실패")) {
      // 백엔드와 authenticationCode로 통신 후 결과 처리
      order.authenticationState = changedAuthenticationState;
      if (changedAuthenticationState.isAuthenticated) {
        order.step = "가이드 타입 선택"
        if (!changedItem && order.item) {
          changedItem = order.item
        }
        if (destinations.length == 0 && order.destinations.length > 0) {
          destinations = order.destinations
        }
      }
      else {
        order.step = "인증 실패"
        if (changedItem) order.item = changedItem
        if (destinations.length > 0) order.destinations = destinations
      }
    }
    else if ((order.step == "가이드 타입 선택" || order.step == "도착") && changedItem) {
      order.step = "목적지 선택"
      order.item = changedItem
    }
    else if (order.step == "목적지 선택") {
      if (destinations.length == 0) continue
      order.step = "안내"
    }
    else if (order.step == "안내") {
      if (destinations.length == 1) {
        if (destinations[0].destinationName == "null") {
          order.step = "없는 장소"
        }
        else if (destinations[0].floor == order.authenticationState.floor) {
          order.destinations = destinations
          order.step = "이동중"
          order.pressedCount = -1
        }
        else {
          order.step = "다른 층"
          order.destinations = destinations
        }
      }
      else {
        order.step = "다른 층"
        order.destinations = destinations
      }
    }
    else if (order.step == "이동중") {
      if (currentRobotState == "도착") {
        order.step = "도착"
      }
      else{
        order.pressedCount += 1
      }
    }
  } while (beforeStep != order.step)

  return order;
}
