# BrrBrr - Autonomous mobile robot

자율주행로봇은 아래와 같이 세 가지 파트로 나눠서 진행되며, 각 파트는 구동부(Drive part), 오도메트리부,(Odometry part) , 커뮤니케이션부(Communication part)로 나눠집니다. 구동파트는 로봇이 주행하도록 추측항법(Dead Reckoning), PID Contorl같은 기법을 사용하여 로봇이 움직일 수 있도록한다. 오도메트리부는 구동부에서 넘어온 데이터와 오도메트리 정보를 융합하여 로봇이 얼마나 움직였는지에 대한 오도메트리 정보를 가져온다.

![image-20200527151141027](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20200527151141027.png)



![mobile-robot-outline](docs/images/mobile_robot_outline.png)



## Drive Part

![image-20200527145519621](docs/images/drive_part_outline.png)

- motor contorl(PID control)
- IMU - Madgwick digital filter
- dead reckoning 
- rosserial로 SBC에 데이터 전달하기

주기는?

주기를 일정하게 하기 위해서는 freeRTOS를 사용할까 고민 중...





## Odometry Part

![image-20200527152619867](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20200527152619867.png)

- 라이다 정보 수집
- rosserial을 통해 MCU로부터 데이터값 확인하기
- remote control
- SLAM
- Navigation

- ROS랑 백엔드 서버 연결..!(주의사항) :dagger:





## Communication Part

