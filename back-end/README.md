# BrrBrr - Backend server

![express-version](https://img.shields.io/badge/express-4.17.1-infomational)
![typescript-version](https://img.shields.io/badge/typescript-3.9-blue)

## 서버 구조도

![서버 구조도](./images/serverMap.jpeg)

## 우리 서버의 특징

- 사용자 인풋이 빅스비라는 서비스를 통해 들어오기 때문에 각 서비스를 동기화하는 것이 가장 중요!
- 단순한 요청 - 응답 으로는 한계가 있어 이벤트 기반의 아키텍처로 설계
- 로봇과의 커뮤니케이션 시 메시지 브로커가 필요할 수 있음 (ex. RabbitMQ, NATS, Kafka)

## 서버 상세 기술

### SocketIO

- 기존 Websocket의 단점을 보완해 라이브러리
- 백엔드 서버와 프론트 페이지 연결에 사용
- 이벤트 기반의 메시지 전달로 프론트 페이지를 변경

### Node cluster

- 싱글 스레드인 Node 서버의 단점을 보완
- 여러 대의 로봇과 연결되었을 때 멀티스레드를 구현하여 서버의 부하 감소