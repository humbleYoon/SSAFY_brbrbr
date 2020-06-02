# API 명세서

## 목차

1. [장소 정보](#1.-장소-정보)
2. [행사 정보](#2.-행사-정보)
3. [로봇 정보](#3.-로봇-정보)

## 1. 장소 정보

### 모든 장소 조회

```http
GET /places
```

헤더

```json
{
    "authCode": 1124
}
```

응답

(헤더에 특정 로봇의 인증 번호가 없는 경우)

```json
// 모든 장소
[
  {
    "id": 1,
    "name": "701호",
    "description": "A 1반 교실입니다",
    "floor": 7,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  }, ...
]
```

(헤더에 특정 로봇의 인증 번호가 있는 경우)

```json
// 해당 로봇이 위치하는 층의 모든 장소
[
  {
    "id": 1,
    "name": "701호",
    "description": "A 1반 교실입니다",
    "floor": 7,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  }, ...
]
```

### 특정 장소 조회

```http
GET /places?name=701호
```

헤더

```json
{
    "authCode": 1124
}
```

응답

(해당 장소 이름이 1개만 존재할 경우)

```json
[
  {
    "id": 1,
    "name": "701호",
    "description": "A 1반 교실입니다",
    "floor": 7,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  }
]
```

(해당 장소 이름이 여러 층에 존재할 경우)

```json
[
  {
    "id": 1,
    "name": "701호",
    "description": "A 1반 교실입니다",
    "floor": 7,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  },
  {
    "id": 2,
    "name": "701호",
    "description": "A 1반 교실의 8층 복사본입니다",
    "floor": 8,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  }
]
```

## 2. 행사 정보

### 모든 행사 조회

```http
GET /events
```

헤더

```json
{
    "authCode": 1124
}
```

응답

(헤더에 특정 로봇의 인증 번호가 없는 경우)

```json
// 모든 장소
[
  {
    "id": 2,
    "name": "2기 수료식",
    "description": "드디어 2기가 수료합니다",
    "starttime": "2020-06-01T04:10:25.000Z",
    "endtime": "2020-06-01T04:10:38.000Z",
    "placeName": "702호",
    "placeFloor": 7,
    "place": {
      "id": 2,
      "name": "702호",
      "description": "A 1반 교실입니다",
      "floor": 7,
      "xaxis": 34.6,
      "yaxis": 445.6,
      "thumburl": "https://wjljsls.com",
      "mapurl": "https://djlskja.com"
    }
  }, ...
]
```

(헤더에 특정 로봇의 인증 번호가 있는 경우)

```json
// 해당 로봇이 위치하는 층의 모든 장소
[
  {
    "id": 2,
    "name": "2기 수료식",
    "description": "드디어 2기가 수료합니다",
    "starttime": "2020-06-01T04:10:25.000Z",
    "endtime": "2020-06-01T04:10:38.000Z",
    "placeName": "702호",
    "placeFloor": 7,
    "place": {
      "id": 2,
      "name": "702호",
      "description": "A 1반 교실입니다",
      "floor": 7,
      "xaxis": 34.6,
      "yaxis": 445.6,
      "thumburl": "https://wjljsls.com",
      "mapurl": "https://djlskja.com"
    }
  }
]
```

### 특정 행사 조회

```http
GET /places?name=2기+수ㄹ식
```

헤더

```json
{
    "authCode": 1124
}
```

응답

```json
[
  {
    "id": 1,
    "name": "701호",
    "description": "A 1반 교실입니다",
    "floor": 7,
    "xaxis": 34.6,
    "yaxis": 445.6,
    "thumburl": "https://wjljsls.com",
    "mapurl": "https://djlskja.com"
  }
]
```

## 3. 로봇 정보

### 모든 로봇 조회

```http
GET /robots
```

응답

```json
[
  {
    "id": 1,
    "name": "부릉이1",
    "floor": 7
  }, ...
]
```

### 로봇 인증 번호 확인

```http
POST /robots/auth
```

요청

```json
{
    "inputAuthenticationCode": 1124
}
```

응답

```json
[
    "isAuthenticated": true
]
```

### 로봇 도착 상태 확인

```http
GET /robots/arrived
```

헤더

```json
{
    "authCode": 1124
}
```

응답

```json
[
    "isArrived": "true"
]
```

<!-- ### 로봇 상태 조회

```http
GET /robots/status
```

헤더

```json
{
    "authCode": 1124
}
```

응답

```json
[
    "status": "대기"
]
``` -->
