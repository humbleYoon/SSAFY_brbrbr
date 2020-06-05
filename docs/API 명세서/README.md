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

- 관리자 페이지에 사용

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

- 인증번호 확인 후 길 안내 버튼을 클릭했을 때 사용

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

(해망 장소가 로봇이 위치한 층에 있는 경우)

- 층과 이름이 알치하는 하나의 장소를 보냄
- 사용자가 가고자 하는 목적지를 말했을 때 요청되고 해당 응답은 도착 페이지에서 사용

```json
// 해당 층의 해당 장소
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
```

(해망 장소가 로봇이 위치한 층에 있지 않은 경우)

- 이름이 일치하는 모든 장소를 보냄
- 다른 층의 장소에 대한 안내 시 사용

```json
// 모든 층에 위치한 해당 장소 이름
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

- 관리자 페이지에 사용

```json
// 모든 행사
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

- 인증번호 확인 후 길 안내 버튼을 클릭했을 때 사용

```json
// 해당 건물의 모든 행사
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
GET /places?name=2기+수료식
```

헤더

```json
{
    "authCode": 1124
}
```

응답

- 이름이 알치하는 하나의 행사에 대한 정보를 보냄
- 사용자가 가고자 하는 행사를 말했을 때 요청되고 해당 응답은 도착 페이지에서 사용

```json
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
```

## 3. 로봇 정보

### 모든 로봇 조회

```http
GET /robots
```

응답

- 관리자 페이지에서 사용

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

- 사용자가 사용 시작 후 인증 번호를 입력했을 때 사용

요청 데이터


```json
{
    "inputAuthenticationCode": 1124
}
```

응답

```json
[
    "isAuthenticated": true,
    "floor": 11
]
```

### 로봇 도착 상태 확인

```http
GET /robots/arrived
```

- 로봇의 길 안내 도줌, 마친 후에 사용

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

### 길 안내 종료 

```http
GET /robots/finished
```

- 목적지 도착 후 모든 안내를 종료하고 싶을 때 사용

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
