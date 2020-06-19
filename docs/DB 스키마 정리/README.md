# DB 스키마

## PostgreSQL

### 장소 정보

|칼럼명|데이터 타입|설명|키 설명|
|---|---|---|---|
|id|Int|고유 ID||
|name|String|이름|PK|
|description|String|설명||
|floor|Int|층 수|PK|
|xaxis|Float|SLAM 지도 위 X 좌표||
|yaxis|Float|SLAM 지도 위 Y 좌표||
|thumburl|String|썸네일 이미지 URL||
|mapurl|String|약도 이미지 URL||

### 행사 정보

|칼럼명|데이터 타입|설명|키 설명|
|---|---|---|---|
|id|Int|고유 ID||
|name|String|이름|PK|
|description|String|설명||
|starttime|Datetime|행사 시작 시간||
|endtime|Datetime|행사 종료 시간||
|placeName|String|행사가 열리는 장소 이름|FK|
|placeFloor|Int|행사가 열리는 층 수|FK|

### 로봇 정보

|칼럼명|데이터 타입|설명|키 설명|
|---|---|---|---|
|id|Int|고유 ID||
|name|String|이름|PK|
|floor|Int|로봇이 위치한 층 수||

## Redis

### 실시간 로봇 상태 

|키|값|
|---|---|
|robot|[{id: Int, code: Int, floor: Int, available: true/false, status: '대기'/'이동중'/'도착', onService: Boolean, destination: String}]|

## MongoDB

### 로그 정보 (Log in MongoDB)

|칼럼명|데이터 타입|설명|키 설명|
|--|--|--|--|
|robotName|String|로봇 이름||
|destination|String|목적지||
|status|String|로봇의 상태 (출발 / 도착 / 종료)||
|orderedAt|Datetime|해당 명령이 일어난 시간||