var console = require('console');
const placeAndEventList = require('lib/placeAndEventList');

module.exports.function = function createOrder (authenticationState, item) {
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
  }

  console.log(order);

  return order;
}
