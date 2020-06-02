// 현재 부여되지 않은 코드를 찾아서 생성한다

const getRandomCode = (
  min: number,
  max: number,
  excludeArr: string[]
): string => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const result = Math.floor(Math.random() * (max - min + 1)) + min
  if (!excludeArr.includes(String(result))) {
    return String(result)
  } else {
    return getRandomCode(min, max, excludeArr)
  }
}

export default getRandomCode
