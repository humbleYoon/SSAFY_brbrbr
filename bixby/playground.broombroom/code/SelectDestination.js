var http = require('http');
var fail = require('fail');
var config = require('config');
const baseURL = config.get("baseURL");

module.exports.function = function selectDestination (searchTerm, order) {
  // 특정 장소, 행사의 디테일 정보에 대해 요청한다.
  var responsePlaces;
  var responseEvents;
  var urlPlaces = baseURL + "/places";
  var urlEvents = baseURL + "/events";
  var query = {
    name: searchTerm
  };
  var options = {
    format: 'json',
    query: query,
    cacheTime: 0,
    headers: order.authenticationState.authenticationCode
  };
  responsePlaces = http.getUrl(urlPlaces, options);
  // console.log(responsePlaces)
  responseEvents = http.getUrl(urlEvents, options);
  // console.log(responseEvents)

  if(responsePlaces || responseEvents) {
    // 0. 데이터에 장소랑 행사가 이름이 같은 경우는 없다고 하면,
    // 1. 요청은 특정 장소, 행사 조희로 각각 보낸다.
    // 2. 각 응답에서 응답의 개수가 1이 있다면?
    // - 장소, 행사 응답 개수가 모두 1이 될 수는 없다.(가정에 의해)
    // - 응답을 바로 destinations[0]에 넣는다.
    // 3. 각 응답에서 응답의 개수�� 모두 0이라면?
    // - destinations[0] name에 "null을 넣는다.
    // 4. 각 응답에서 응답의 개수가 2 이상인 것이 있다면?
    // - destinations에 모두 넣는다.

    var destinations = [];
    if(responsePlaces.data.length == 1 || responseEvents.data.length == 1) {
      destinations[0] = {
        destinationName: responsePlaces.data.length == 1 ? responsePlaces.data[0].name : responseEvents.data[0].name,
        destinationDescription: responsePlaces.data.length == 1 ? responsePlaces.data[0].description : responseEvents.data[0].description,
        floor: responsePlaces.data.length == 1 ? responsePlaces.data[0].floor : responseEvents.data[0].floor
      }
    }
    else if(responsePlaces.data.length == 0 && responseEvents.data.length == 0) {
      destinations[0] = {
        destinationName: "null",
        destinationDescription: "null",
        floor: "null"
      }
    }
    else {
      if(responsePlaces.data.length >= 2) {
        for(let i=0; i<reponsePlaces.data.length; i++) {
          destinations[i] = {
            destinationName: responsePlaces.data[i].name,
            destinationDescription: responsePlaces.data[i].description,
            floor: responsePlaces.data[i].floor
          }
        }
      }
      else {
        for(let i=0; i<reponseEvents.data.length; i++) {
          destinations[i] = {
            destinationName: responseEvents.data[i].name,
            destinationDescription: responseEvents.data[i].description,
            floor: responseEvents.data[i].placeFloor
          }
        }
      }
    }
  }
  else {
    throw fail.checkedError("NoResult", "NoResult")
  }

  return destinations
}
