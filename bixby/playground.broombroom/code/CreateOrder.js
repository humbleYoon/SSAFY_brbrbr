var console = require('console');

module.exports.function = function createOrder () {
  var order = {
    authenticationState: {
      authenticationCode: -1,
      isAuthenticated: false,
      floor: 11,
    },
    pressedCount: 0,
    step: "인증"
  }

  console.log(order);

  return order;
}
