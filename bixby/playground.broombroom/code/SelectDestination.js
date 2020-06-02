const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function selectDestination (searchTerm) {
  var destinations = [{
    destinationName: searchTerm,
    floor: 11
  }]

  // dummy
  placeAndEventList.places.forEach(place => {
    if (place.placeName == searchTerm) {
      destinations[0].destinationDescription = place.placeDescription
    }
  })
  placeAndEventList.events.forEach(event => {
    if (event.eventName == searchTerm) {
      destinations[0].destinationDescription = event.eventDescription
    }
  })
  return destinations
}
