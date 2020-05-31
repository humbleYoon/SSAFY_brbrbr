module.exports.function = function isPressedArrivalButton () {
  var number = Math.ceil(Math.random() * 3) % 3;
  var result;
  if (number == 0) {
    result = "도착"
  }
  else if (number == 1) {
    result = "정지"
  }
  else {
    result = "이동중"
  }
  return result
}
