var console = require('console')
const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function searchPlaceAndEvent () {
  var item = {
    guideType: "안내",
    placeAndEvent: {
      places: placeAndEventList.places,
      events: placeAndEventList.events,
    },
  }
  return item
}