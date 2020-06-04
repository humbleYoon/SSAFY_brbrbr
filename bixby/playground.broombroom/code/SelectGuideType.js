var console = require('console')
var http = require('http');
var fail = require('fail');
var config = require('config');
const baseURL = config.get("baseURL");

module.exports.function = function selectGuideType (guideType, order) {
  // 가이드 타입을 선택하고, 그에 따른 장소, 행사에 대한 정보를 요청한다.
  var responsePlaces;
  var responseEvents;
  var urlPlaces = baseURL + "/places";
  var urlEvents = baseURL + "/events";
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: order.authenticationState.authenticationCode
  };
  responsePlaces = http.getUrl(urlPlaces, options);
  // console.log(responsePlaces)
  responseEvents = http.getUrl(urlEvents, options);
  // console.log(responseEvents)

  if (reponsePlaces || responseEvents) {
    let placeResult = [];
    for(let i=0; i<reponsePlaces.data.length; i++) {
      placeResult[i] = {
        placeName: responsePlaces.data[i].name,
        placeDescription: responsePlaces.data[i].description,
        thumbUrl: responsePlaces.data[i].thumurl
      }
    }
    let eventResult = [];
    for(let i=0; i<reponseEvents.data.length; i++) {
      eventResult[i] = {
        eventName: responseEvents.data[i].name,
        eventDescription: responseEvents.data[i].description,
        thumbUrl: responseEvents.data[i].thumurl
      }
    }
    var placeAndEventList = {
        places: placeResult,
        events: eventResult
     };
  }
  else {
    throw fail.checkedError("NoResult", "NoResult")
  }

  var changedItem = {
    guideType: guideType,
    placeAndEvent: placeAndEventList
  };

  return changedItem
}
