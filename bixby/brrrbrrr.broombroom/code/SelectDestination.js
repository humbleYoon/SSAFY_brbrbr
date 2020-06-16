var http = require('http');
var fail = require('fail');
var console = require('console');
var secret = require('secret');
const baseURL = secret.get("baseURL");

module.exports.function = function selectDestination (searchTerm, order) {
  // 특정 장소, 행사의 디테일 정보에 대해 요청한다.

  var ssafy_valid_str = searchTerm.substring(0, 2);
  if (ssafy_valid_str == "사피" || ssafy_valid_str == "서피") {
    searchTerm = "싸피" + searchTerm.substring(2);
  }
  ssafy_valid_str = searchTerm.substring(0, 3);
  if (ssafy_valid_str == "싸 피" || ssafy_valid_str == "사 피"  || ssafy_valid_str == "써 피" || ssafy_valid_str == "서 피") {
    if (searchTerm.substring(3, 4) == " ")
      searchTerm = "싸피" + searchTerm.substring(3);
    else searchTerm = "싸피 " + searchTerm.substring(3);
  }

  var url = baseURL + "/searchs";
  var query = {
    name: searchTerm
  };
  var authCode = order.authenticationState.authenticationCode.toString();
  var options = {
    format: 'json',
    query: query,
    cacheTime: 0,
    headers: {
      'authCode': authCode
    }
  };
  var response = http.getUrl(url, options);
  // console.log(response);

  if(response) {
    // 0. 데이터에 장소랑 행사가 이름이 같은 경우는 없다고 하면,
    // 1. 요청은 searchTerm 조희로 보낸다.
    // 2. place, event 중 1이 있다면?
    // - 장소, 행사 응답 개수가 모두 1이 될 수는 없다.(가정에 의해)
    // - 같은 층에 있는 장소 또는 행사
    // - place, event 중 존재하는 응답을 destinations[0]에 넣는다.
    // 3. 각 응답에서 응답의 개수가 모두 0이라면?
    // - 없는 장소 그리고 행사
    // - destinations[0] name에 "null을 넣는다.
    // 4. 그 외의 경우에서 places, events가 존재한다면?
    // - 다른 층에 있는 장소 또는 행사
    // - destinations에 places 또는 events를 모두 넣는다.

    var destinations = [];
    if(response.place || response.event) {
      destinations[0] = {
        destinationName: response.place ? response.place[0].name : response.event[0].name,
        destinationDescription: response.place ? response.place[0].description : response.event[0].description,
        floor: response.place ? response.place[0].floor : response.event[0].placeFloor,
        thumbUrl: response.place ? response.place[0].thumburl : response.event[0].thumburl
      }
    }
    else {
      if(response.places.length == 0) {
        if(!response.events) {
          destinations[0] = {
            destinationName: "null",
            destinationDescription: "null",
            floor: -1,
            thumbUrl: "/images/imgUrls/default.png"
          }
        }
        else {
          for(let i=0; i<response.events.length; i++) {
            destinations[i] = {
              destinationName: response.events[i].name,
              destinationDescription: response.events[i].description,
              floor: response.events[i].placeFloor,
              thumbUrl: response.events[i].thumburl,
            }
          }
        }
      }
      else {
        for(let i=0; i<response.places.length; i++) {
          destinations[i] = {
            destinationName: response.places[i].name,
            destinationDescription: response.places[i].description,
            floor: response.places[i].floor,
            thumbUrl: response.places[i].thumburl
          }
        }
      }
    }
  }
  else {
    throw fail.checkedError("NoResult", "NoResult")
  }

  // console.log(destinations)
  return destinations
}
