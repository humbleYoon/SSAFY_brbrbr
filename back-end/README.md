# BrrBrr - Backend server

![express-version](https://img.shields.io/badge/express-4.17.1-infomational)
![typescript-version](https://img.shields.io/badge/typescript-3.9-blue)

## Getting started - 백엔드 서버를 직접 구동해보고 싶다면...

### 준비사항

- 가능한 최신 버전의 `Docker`를 설치해주세요
- `git clone`을 이용해 현재 repositiory를 로컬 머신에 자장해주세요

### 1. 데이터베이스 컨테이너 실행하기

- Postgres 컨테이너 실행

```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres:latest
```

- Redis 컨테이너 실행
  - `--requirepass "password"` flag로 패스워드 설정이 가능합니다

```bash
docker run --name redis -p 6379:6379  -d redis:latest
```

- MongoDB 컨테이너 실행

```bash
docker run --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAM=mongo -e MONGO_INITDB_ROOT_PASSWORD=password -d mongo:latest
```

- `docker container ls` 명령어로 3개의 컨테이너가 실행되고 있는지 확인하세요

### 2. `.env` 파일 작성

```
# <프로젝트 루트 폴더>/back-end/.env

COOKIE_SECRET=<랜덤 값>
PORT=<포트 번호>
SOCKET_CLIENT_HOST=*:* # 현재는 모든 도메인의 소켓 연결을 허용함
REDIS_URL=redis://redis:6379
MONGO_URL=mongodb://mongo:password@localhost:27017/public?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
# BROKER_HOST=<브로커 서버 URL> 로봇과 연결되었을 때 RabbitMQ 브로커 서버 사용 시 필요
```

```
# <프로젝트 루트 폴더>/back-end/prisma/.env

DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=public"
```

### 3. DB 마이그레이션

- Node 패키지 설치

```bash
yarn
```

- Prisma client 생성 & DB에 스키마 적용

```bash
yarn run prisma migrate up --experimental
yarn run prisma generate
```

### 4. 개발 서버 시작

```bash
yarn dev
```

## 서버 구조도

![서버 구조도](./images/serverMap.jpeg)

## 우리 서버의 특징

- 사용자 인풋이 빅스비라는 서비스를 통해 들어오기 때문에 각 서비스를 동기화하는 것이 가장 중요!
- 단순한 요청 - 응답 으로는 한계가 있어 이벤트 기반의 아키텍처로 설계
- 로봇과의 커뮤니케이션 시 메시지 브로커가 필요 (ex. RabbitMQ, NATS, Kafka)

## 사용 중인 기술

### SocketIO

- 기존 Websocket의 단점을 보완해 라이브러리
- 백엔드 서버와 프론트 페이지 연결에 사용
- 이벤트 기반의 메시지 전달로 프론트 페이지를 변경

### PostgreSQL + Prisma 2

- 사용자에게 제공하는 정보인 장소, 행사, 로봇 데이터를 저장
- 해당 데이터들이 관계를 맺고 있기 때문에 안정성 놎은 오픈소스 관계형 DB인 Postgres를 사용
- Prisma 클라이언트는 Typescript 프로젝트에서 직관적인 ORM, 자체 캐시 기능 등 쉽고 빠른 데이터 관리를 도움

[상세한 DB 스키마 보러가기 클릭!](/docs/DB%20스키마%20정리/README.md#PostgreSQL)

### Redis + Node-redis

- 실시간 로봇의 상태, 소켓 정보를 저장
- 로봇 상태는 서비스 구동 중 빈번하게 수정이 일어나고 영구적인 저장이 필요하지 않기 때문에 인메모리 DB인 Redis 사용
- Node-cluster를 구현했을 때 소켓 정보를 기억하는 수단으로 사용

[상세한 DB 스키마 보러가기 클릭!](../docs/DB%20스키마%20정리/README.md#Redis)

### MongoDB + Mongoose

- 사용자의 명령, 로봇의 상태 데이터를 로그 형태로 누적하여 수집
- 신속한 저장과 대용량 데이터 적재를 위해 NoSQL DB 중 하나인 Mongo 사용
- 가장 안정적ㅇ ORM인 Mongoose를 이용해 쉽고 빠른 개발이 가능

[상세한 DB 스키마 보러가기 클릭!](../docs/DB%20스키마%20정리/README.md#MongoDB)

### RabbitMQ

- 브로커 서버를 통해 AMPQ 프로토콜 기반으로 ROS와 직접적인 통신을 가능하게 함
- Pub/Sub 기능을 바탕으로 Event-driven 아키텍쳐 구현

### Docker

- 서비스 전체를 컨테이너 기반에서 구동하여 scalable한 아키텍쳐 구성
- 향후 빌드와 테스트 자동화를 구현하는 데 큰 이점

## 사용 예정인 기술

### Node cluster

- 싱글 스레드인 Node 서버의 단점을 보완
- 여러 대의 로봇과 연결되었을 때 멀티스레드를 구현하여 서버의 부하 감소
