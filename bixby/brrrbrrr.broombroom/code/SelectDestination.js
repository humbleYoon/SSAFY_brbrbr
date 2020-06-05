const placeAndEventList = require('lib/placeAndEventList')

module.exports.function = function selectDestination (searchTerm) {
  var destinations = [{
    destinationName: "null",
    destinationDescription: "디풜트 설명",
    floor: 11
  }]

  // dummy
  placeAndEventList.places.forEach(place => {
    if (place.placeName == searchTerm) {
      destinations[0].destinationName = searchTerm
      destinations[0].destinationDescription = place.placeDescription
      destinations[0].floor = 11
    }
  })
  placeAndEventList.events.forEach(event => {
    if (event.eventName == searchTerm) {
      destinations[0].destinationName = searchTerm
      destinations[0].destinationDescription = event.eventDescription
      destinations[0].floor = event.floor 
    }
  })
  return destinations
}
