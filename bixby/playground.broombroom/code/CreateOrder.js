var console = require('console');

module.exports.function = function createOrder () {
  var order = {
    authenticationState: {
      authenticationCode: 1124,
      isAuthenticated: false,
    },
    orderNumber: 1,
    step: "인증",
  }

  console.log(order);

  return order;
}
