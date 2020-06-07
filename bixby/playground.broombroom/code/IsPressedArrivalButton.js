module.exports.function = function isPressedArrivalButton (arrivalButtonState) {
  if (arrivalButtonState == "정지") {
    return "정지"
  }
  
  var number = Math.ceil(Math.random() * 2) % 2;
  var result;
  if (number == 0) {
    result = "도착"
  }
  else {
    result = "이동중"
  }
  return result
}
