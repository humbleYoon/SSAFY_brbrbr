var console = require('console')
const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function searchPlaceAndEvent (authenticationCode, guideType) {
  var item = {
    authenticationCode: authenticationCode,
    guideType: guideType,
    placeAndEvent: {
      places: placeAndEventList.places,
      events: placeAndEventList.events,
    }
  }
  console.log("placeAndEventList", placeAndEventList)
  console.log(item)
  return item
}
