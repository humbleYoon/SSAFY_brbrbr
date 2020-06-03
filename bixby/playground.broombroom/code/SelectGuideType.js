const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function selectGuideType (guideType) {
  var changedItem = {
    guideType: guideType,
    placeAndEvent: placeAndEventList
  }
  return changedItem
}
