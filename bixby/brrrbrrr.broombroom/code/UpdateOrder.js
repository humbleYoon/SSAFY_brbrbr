var console = require('console');
var lib = require('./GetPlaceAndEvent.js');

module.exports.function = function updateOrder (order, changedAuthenticationState, destinations, currentRobotState) {
  var beforeStep

  if (!changedAuthenticationState.isAuthenticated) {
    order.step = "인증 실패";
  }

  do {
    beforeStep = order.step
    if ((order.step == "인증" || order.step == "인증 실패")) {
      order.authenticationState = changedAuthenticationState;
      // 인증 번호가 맞다면
      if (changedAuthenticationState.isAuthenticated) {
        order.step = "목적지 선택"
        // 인증번호를 틀리고 난 후
        if (destinations.length == 0 && order.destinations.length > 0)
          destinations = order.destinations
        // 기본 시나리오를 진행해 올 때 성공 흐름의 destinations 백업
        else order.destinations = destinations
      }
      else {
        order.step = "인증 실패"
        if (destinations.length > 0)
          order.destinations = destinations
      }
    }
    else if (order.step == "도착" || order.step == "없는 장소" || order.step == "다른 층" || order.step == "정지") {
      order.step = "목적지 선택"
    }
    else if (order.step == "목적지 선택") {
      if (destinations.length == 0) {
        order.item = lib.getPlaceAndEvent(order)
        break
      }
      order.step = "안내"
    }
    else if (order.step == "안내") {
      if (destinations.length == 1) {
        if (destinations[0].destinationName == "null") {
          order.step = "없는 장소"
          break
        }
        else if (destinations[0].floor == order.authenticationState.floor) {
          order.destinations = destinations
          order.step = "이동중"
          order.pressedCount = -1
        }
        else {
          order.step = "다른 층"
          order.destinations = destinations
          break
        }
      }
      else {
        order.step = "다른 층"
        order.destinations = destinations
        break
      }
    }
    else if (order.step == "이동중") {
      if (currentRobotState == "도착") {
        order.step = "도착"
        break
      }
      else if (currentRobotState == "정지") {
        order.step = "정지"
        break
      }
      else {
        order.pressedCount += 1
      }
    }
  } while (beforeStep != order.step)

  return order;
}
