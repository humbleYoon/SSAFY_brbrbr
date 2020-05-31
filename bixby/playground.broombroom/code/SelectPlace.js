const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function selectPlace (selectedPlaceName) {
  var destination = {
    destinationName: selectedPlaceName,
  }

  placeAndEventList.places.forEach(place => {
    if (place.placeName == selectedPlaceName) {
      destination.destinationDescription = place.placeDescription
    }
  })
  return destination
}
