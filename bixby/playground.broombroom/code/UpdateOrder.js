var console = require('console');

module.exports.function = function updateOrder (order, changedAuthenticationState, changedItem, selectedPlaceName, selectedEventName, currentRobotState) {
  var nextOrder = order;

  if (order.step == "인증") {
    // 백엔드와 authenticationCode로 통신 후 결과 처리
    const retState = {
      authenticationCode: changedAuthenticationState.authenticationCode,
      isAuthenticated: changedAuthenticationState.authenticationCode == 1124,
    };

    if (changedAuthenticationState.authenticationCode == 1124) {
      nextOrder.step = "가이드 타입 선택"
    }

    nextOrder.authenticationState = retState;
    console.log(nextOrder);
  }
  else if (order.step == "가이드 타입 선택") {
    
    nextOrder.step = "안내"

    nextOrder.item = changedItem;
    console.log(nextOrder);
  }
  else if (order.step == "안내") {
    const retDestination;
    if (selectedPlaceName) {
      retDestination = {
        destinationName: selectedPlaceName,
        destinationDescription: "장소에 대한 설명이 들어갑니다",
      };
    }
    else {
      retDestination = {
        destinationName: selectedEventName,
        destinationDescription: "행사에 대한 설명이 들어갑니다.",
      };
    }
    nextOrder.destination = retDestination
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
