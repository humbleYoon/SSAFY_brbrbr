var console = require('console');
const placeAndEventList = require('lib/placeAndEventList');

module.exports.function = function createOrder (authenticationState, item, step) {
  var order = {
    authenticationState: {
      authenticationCode: 1124,
      isAuthenticated: false,
    },
    item: {
      guideType: "안내",
      placeAndEvent: placeAndEventList,
      robotState: "정지",
    },
    orderNumber: 1,
    step: "인증 페이지",
  }

  console.log(order);

  return order;
}
