var console = require('console');

module.exports.function = function createOrder (authenticationCode) {
  var order = {
    authenticationState: {
      authenticationCode: authenticationCode,
      isAuthenticated: false,
    },
    step: "",
    destination: {
      destinationName: "ㅇ",
      destinationDescription: "ㅇ",
    },
    pressedCount: 0,
  }

  if (authenticationCode == 1124) {
    order.step = "가이드 타입 선택"
  }
  else order.step = "인증"

  console.log(order);

  return order;
}
