var console = require('console');
var http = require('http');
var fail = require('fail');
var secret = require('secret');
const baseURL = secret.get("baseURL");

module.exports.function = function selectGuideType (guideType, order) {
  // 가이드 타입을 선택하고, 그에 따른 장소, 행사에 대한 정보를 요청한다.
  var urlPlaces = baseURL + "/places";
  var urlEvents = baseURL + "/events";
  var authCode = order.authenticationState.authenticationCode.toString();
  var options = {
    format: 'json',
    cacheTime: 0,
    headers: {
      'authCode': authCode
    }
  };
  var responsePlaces = http.getUrl(urlPlaces, options);
  // console.log(responsePlaces);
  var responseEvents = http.getUrl(urlEvents, options);
  // console.log(responseEvents)

  var placeAndEventList;
  if (responsePlaces || responseEvents) {
    let placeResult = [];
    for(let i=0; i<responsePlaces.length; i++) {
      placeResult[i] = {
        placeName: responsePlaces[i].name,
        placeDescription: responsePlaces[i].description,
        thumbUrl: !!responsePlaces[i].thumburl ? responsePlaces[i].thumburl : "images/imgUrls/default.png"
      };
    }
    let eventResult = [];
    for(let i=0; i<responseEvents.length; i++) {
      eventResult[i] = {
        eventName: responseEvents[i].name,
        eventDescription: responseEvents[i].description,
        thumbUrl: !!responseEvents[i].thumburl ? responseEvents[i].thumburl : "images/imgUrls/default.png"
      };
    }
      placeAndEventList = {
        places: placeResult,
        events: eventResult
     };
  }
  else {
    throw fail.checkedError("NoResult", "NoResult");
  }

  var changedItem = {
    guideType: guideType,
    placeAndEvent: placeAndEventList
  };
  
  return changedItem
}
