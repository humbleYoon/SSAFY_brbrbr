# 부릉부릉 (BrrrBrrr) - Autonomous Mobile Robot



## **:car: 부릉부릉 자율주행:car:**

---

**자율주행 로봇(Autonomous Mobile Robot)**은 공간의 제약으로부터 벗어나 한 대의 로봇만으로 여러 장소에서 업무를 수행할 수 있으므로 다양한 분야에 활용될 수 있습니다. 특히, 실내에서 이동하여 업무를 수행할 수 있는 자율주행 로봇은 물품 조달 로봇부터 간호 로봇, 물류 로봇, 안내 로봇 등으로 광범위하게 활용될 수 있습니다. 우리의 **부릉부릉 자율주행 로봇 시스템**에서는 **빅스비(Bixby) 음성인식**과 여러 가지의 **자율주행 기술**들을 활용하여 특정 장소에 대한 **안내 서비스**를 **비대면**으로 선보이고자 합니다.



![](docs/images/Autonomous_mobile_robot_2.png)

![image-20200527151141027](docs/images/mobile_robot_outline2.png)



**SLAM(Simultaneous Localization And Mapping)**과 **네비게이션(Navigation)**, **오브젝트 디텍션(Object Detection)** 등을 통해 실제로 특정 실내 환경에서 자율주행이 가능한 ROS 기반의 자율주행 로봇을 다음과 같이 제작하였습니다.

자율주행로봇은 위와 같이 세 개의 파트로 나눠서 진행되며, 각 파트는 **구동부(Drive part)**, **오도메트리부(Odometry part)**, **커뮤니케이션부(Communication part)**로 나눠집니다. 첫째, **구동부**는 로봇의 움직임을 제어하고 각종 센서 데이터를 수집합니다. 둘쨰, **오도메트리부**는 라이다를 이용해 수집한 정보를 SLAM과 네비게이션 알고리즘에 사용할 수 있도록 가공하고 MCU에 제어명령을 전송합니다. 마지막으로 셋째, **커뮤니케이션부**는 카메라를 이용하여 사용자를 식별하고, 모션 인식 등을 이용해 개인 맞춤형 서비스를 제공합니다. 



![mobile-robot-outline](docs/images/mobile_robot_outline.png)



## **1. 구동부 (Drive Part)**

---

![image-20200527145519621](docs/images/drive_part_outline.png)



### **구동부 핵심 기능**

- 로봇 동작 중 모터의 속도를 제어하기 위한 **PID 컨트롤**
- 센서로부터 받은 관성 정보를 쿼터니언(Quaternion) 값으로 변환하기 위한 **매드윅(Madgwick) 필터**
- 로봇의 움직임을 추측하는 **추측 항법(Dead Reckoning)**
- **rosserial**을 통한 모터 제어 명령 수신 및 센서 데이터 전송





#### **1-1. PID 컨트롤**

모터 움직임을 안정적으로 제어하기 위하여 **PID 컨트롤**을 사용합니다. 부릉부릉 시스템에서는 Kp = ?, Ki = ?, Kd = ? 를 사용하였습니다.

**[ 참조 ]**

https://en.wikipedia.org/wiki/PID_controller

http://ctms.engin.umich.edu/CTMS/index.php?example=Introduction&section=ControlPID





#### **1-2. 매드윅 필터 (Madjwick Filter)**

IMU에서 얻어온 관성 데이터 센서값을 **매드윅 필터링**을 수행하여 이동 로봇의 회전 상태를 나타내는 **쿼터니언(Quaternion)**을 구합니다. 쿼터니언은 로봇의 오도메트리를 구하는데 사용됩니다.

물체가 회전하도록 중심축을 가진 구조물을 **짐벌(Gimbal)**이라고 하는데, 3차원 공간에서의 강체의 방향은 오일러 각을 이용해 세 번의 회전을 통해 얻을 수 있습니다. 하지만 이 회전 과정에서 두 개 이상의 축이 겹쳐서 다른 축이 자유도를 잃어 원하는 방향으로 회전할 수 없는 현상을 **짐벌락(Gimbal Lock)**이라고 합니다. 이를 매드윅 필터를 이용하면 방지할 수 있습니다.

**[ 참조 ]**

https://www.x-io.co.uk/res/doc/madgwick_internal_report.pdf

https://en.wikipedia.org/wiki/Gimbal_lock





#### **1-3. 추측 항법(Dead Reckoning)**

본 시스템에서는 바퀴 이동량을 훨 엔코더 값으로 계산하여 **2계 룽게-쿠타 데드레커닝(Sencond Order Runge-Kutta Dead Reckoning)**을 수행하여 자율 주행 이동 로봇의 대략적인 위치를 추정할 수 있습니다.

여기서 **추측 항법(Dead Reckoning)**이란 이미 알고 있는 출발 위치에서 방향와 속력 등을 계산해 자신의 위치를 추측하며 구동하는 방법을 말합니다. **추측 위치(Dead Reckoning Position, DRP)**는 출발 위치에서 방향와 속력만 계산한 것을 말하며, **추정 위치(Estimated Position, EP)**는 추측 위치에서 신뢰성을 높이기 위해 다양한 외력의 영향을 추가적으로 감안해 구한 위치를 말합니다.



![image-20200529151739377](docs/images/dead_reckoning.png)



**[ 참조 ]**

[https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods](https://en.wikipedia.org/wiki/Runge–Kutta_methods)

https://en.wikipedia.org/wiki/Rotary_encoder





#### **1-4. rosserial 통신제어**

**rosserial** 을 통해 모터에 대한 제어 명령을 수신받고 IMU, 휠 엔코더 등 센서 데이터를 가공해 오도메트리 파트로 전달합니다.





## **2. 오도메트리부 (Odometry Part)**

---

![image-20200527152619867](docs/images/odometry_part_outline.png)



### **오도메트리부 핵심 기능**

- **LiDAR** 정보 수집 및 가공
- 수집한 센서 데이터를 이용한 **원격 조정**
- **SLAM**
- **Navigation**





#### **2-1. LiDAR 정보 및 수집 가공**

**라이다(LiDAR, Light Detection and Ranging)**란 광원과 수신기를 사용하여 개체를 탐지하고 거리를 측정하는 센싱 기술입니다. 저희가 측정한 센서 정보는 아래와 같습니다.

![image-20200529153832369](docs/images/lidar_test.png)

라이다의 작동 원리는, 방출된 적외선 펄스가 물체에 부딪혀 반사되어 돌아오면, 수신기가 돌아온 펄스를 감지하게 됩니다. 여기서 펄스를 전송한 후 수신하기까지의 시간을 측정해 라이다와 물체 사이의 간격을 측정할 수 있는데, 이를 자율 주행 로봇 이동에 사용하거나, Object Detection 등에 이용될 수 있습니다.

**[ 참조 ]**

https://en.wikipedia.org/wiki/Lidar





#### **2-2. 원격 조정**

![image-20200529153832369](docs/images/remote_control.png)



구동부에서 받은 센서값 및 휠 엔코더 값을 받아 오도메트리부에서 rosserial 의 topic을 통해 구동부에 다시 명령을 전달합니다. 이 명령은 가고자 하는 방향으로의 이동을 수행합니다.





#### **2-3. SLAM**

**SLAM(Simultaneous Localization and Mapping, 동시적 위치추정 및 지도작성)**은 하나의 개체가 주변 환경을 인식해 그 공간의 지도를 작성하고, 자신의 위치를 특정하는 알고리즘을 말합니다. 로봇 청소기에서, 청소기가 주변의 사물들을 인식하고, 벽, 천장, 가구 등에 대한 정보를 습득하는 과정을 생각하면 쉽습니다. 이 정보들을 이용해 로봇 청소기는 자동으로 집 안을 청소하고 본래 자기 자신이 있던 곳으로 돌아오게 됩니다.

본 프로젝트에서는 구글이 2016년 공개한 **카토그래퍼(Cartographer)**라는 SLAM 라이브러리를 ROS 환경에서 사용할 예정이며, 이 과정을 잘 나타낸 동영상이 다음과 같이 나와 있습니다.

<iframe width="941" height="500" src="https://www.youtube.com/embed/DM0dpHLhtX0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



**[ 참조 ]**

https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping

https://www.youtube.com/watch?v=KKG95xMVTas





#### **2-4. Navigation**

부릉부릉 자율 주행 Navigation 알고리즘으로 **DWA(Dynamic Window Approach)** 알고리즘을 이용합니다. DWA 알고리즘은 첫째, **검색이 가능한 유효한 공간**이 주어져야 하고, 둘째, 이 공간에서 **최적의 경로**를 찾습니다. 이 검색 경로는 짧은 시간 간격 내에 도달이 가능하며, 충돌이 없는 안전한 원형 궤도로 제한됩니다.

로봇이 장애물과 최대한의 간격을 두고 도착할 수 있는 방향과 속도를 설정하는 게 제일 중요하다고 말할 수 있습니다. DWA 알고리즘은 ROS 환경에서도 사용이 가능합니다.

**[ 참조 ]**

https://en.wikipedia.org/wiki/Dynamic_window_approach

http://adrianboeing.blogspot.com/2012/05/dynamic-window-algorithm-motion.html

http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.665.3032&rep=rep1&type=pdf





## **3. 커뮤니케이션부 (Communication Part)**

---

![communication part](./docs/images/communicationMap.png)



### **커뮤니케이션부 핵심 기능**

- **Object Detection**을 통한 객체 인식으로 장애물 인식
- **TSM을 활용한 모션 인식**으로 로봇 명령 수행
- **OpenCV**를 활용한 개인별 맞춤형 서비스





#### **3-1. Object Detection**

**Object Detection**은 컴퓨터 비전과 이미지 처리와 관련된 컴퓨터 기술로, 디지털 이미지와 비디오를 이용해 특정 계열의 객체 인스턴스를 감지하는 작업을 말합니다.

본 프로젝트에서는 **Jetson Nano**에서 파이썬 기반의 오픈 소스 머신러닝 라이브러리인 **PyTorch**를 사용하며, **Fast R-CNN (Fast Region basedConvolutional Neural Network) 알고리즘**을 활용해 미리 훈련된 모델을 바탕으로 물체를 인식합니다.

![](./docs/images/object_detection.png)

여기서 물체가 있을법한 영역을 빠른 속도로 찾아내는 알고리즘을 **Reason Proposal 알고리즘**이라고 하는데, 이를 이용해 빠르게 Classification 과정을 수행함으로써, Sliding Window 방식의 비효율성을 개선할 수 있습니다.

**[ 참조 ]**

https://pytorch.org/tutorials/intermediate/torchvision_tutorial.html

https://www.learnopencv.com/faster-r-cnn-object-detection-with-pytorch/





#### **3-2. TSM(Temporal Shift Module)**

**TSM(Temporal Shift Module)**은 3D CNN의 우수한 성능을 가지지만 2D CNN의 복잡성으로 구현할 수 있는, 고효율성으로 대기시간이 짧은 비디오 인식 및 객체 감지가 가능한 모델입니다.

![](./docs/images/temporal_shift_module.png)

![](./docs/images/gesture.gif)

자율주행 서비스 로봇은 위와 같이 자율주행 로봇의 사용자가 손 제스처를 사용하여 로봇과 통신할 수 있도록 하는 것을 목표로 하고 있습니다.

**[ 참조 ]**

https://github.com/mit-han-lab/temporal-shift-module





#### **3-3. OpenCV**

**OpenCV**는 실시간 컴퓨터 비전을 목적으로 이미지 프로세싱에 중점을 둔 라이브러리이며, 이는 영상 관련 라이브러리의 표준으로 여겨지고 있습니다. **이진화(Binarization), 노이즈 제거, 패턴인식, Edge Detection** 등의 많은 기능들을 지원하고, 이를 이요한 이미지 처리를 용이하게 해 줍니다.

본 프로젝트에서는 OpenCV를 이용해 사용자 얼굴을 인식하여 본인 여부나 사용자 정보를 확인한 후, 사용자가 원하는 맞춤형 서비스를 제공할 수 있다는 데에 의의가 있습니다.

**[ 참조 ]**

https://opencv.org/







## **:blue_car: 부릉부릉 프로젝트는 이렇게 구성되었어요!! :blue_car:**

---

부릉부릉 프로젝트는 어떻게 구성되었을까요?? 지금부터 하나하나 알아보도록 할까요??





## 1. 주요 기술 스택

---

![image-20200529153832369](./docs/images/TechnologyStack.png)

**백엔드** : Node.js, mongoDB, PostgreSQL, redis, Socket.io

- **mongoDB** : 로봇 및 서버 로그 기록을 저장
- **PostgreSQL** : Bixby Capsule 상호 작용을 위한 데이터 저장
- **redis** : 실시간으로 변화하는 로봇의 상태에 대한 정보를 저장
- **Socket.io** : Back-end에서 실시간으로 업데이트 되는 정보를 Front-end(로봇 얼굴)에서 바로 보여주기 위하여 사용

**프론트엔드** : React, Typescript, Bixby

- **React** : 로봇 디스플레이에서 로봇의 상태와 빅스비 연동을 위한 Front-end Framework 사용
- **Bixby** : 사용자-로봇 상호작용에서 완전 비대면 서비스를 구축하기 위해 Bixby Capsule을 사용

**로봇** : ROS, Rviz, Gazebo, ARM-CortexM4 CMSIS, STM32CubeIDE

- **ROS** : 이기종 디바이스 간의 연결과 SLAM, Navigation Package의 사용을 위한 로봇 미들웨어
- **Rviz** : 실시간으로 로봇의 상태를 3D GUI 에서 확인할 수 있는 시각화 도구
- **Gazebo** : 로봇 가상 시뮬레이션을 위한 물리 엔진이 포함된 도구
- **ARM-CoretexM4** : 센싱와 액츄에이터 조작을 위한 32-bit MCU 사용(Floating Point 연산이 빈번하기 때문에 FPU가 들어간 아키텍쳐 선정)





## 2. 부릉부릉 프로젝트의 목표

---

- 세계적으로 코로나 바이러스가 유행하고 있습니다. 이로 인해 사람과 사람 사이에 이루어지는 대면 서비스에 대해 불안감이 높아졌고, 이런 문제를 해결하기 위한 **언택트(Untact) 서비스** 기술에 대한 수요가 늘어나고 있습니다. 이에 Zoom, WebX 과 같은 언택트 화상 회의 서비스 뿐 아니라 기존에 대면으로 제공하던 배달, 안내 서비스도 비대면으로 제공할 수 있다는 점에서 **자율주행 서비스 로봇** 시장은 언택트 서비스 시장에서 점점 큰 비중을 차지하게 되었습니다.

  

- 본 프로젝트에서 구현한 자율주행 안내 서비스 로봇은 기존에 제공되던 서비스를 언택트 서비스로 대체함으로써 코로나19 확산을 방지함과 동시에 기존 서비스를 똑같이 제공할 수 있다는 데 가장 큰 의의를 둡니다. 저희의 자율주행 서비스 **부릉부릉**에서는 기본적으로 특정한 장소에서 해당 장소에 대한 안내, 출입자 관리 서비스를 제공합니다.

  

- 첫째로, **안내 서비스**는 해당 장소를 이용하는 일반 사용자에게 행사 정보 안내와 빠른 길찾기 등의 정보를 음성인식 기반 어플리케이션인 **빅스비(Bixby) 캡슐**을 통해 제공합니다. 둘째로, **출입자 관리 서비스**는 해당 장소에 출입하는 이용자에 대한 신원 파악 및 상태 정보를 이미지 센서를 통해 지속적으로 확인하여 관리자가 더욱 쉽게 인원을 파악하고 장소를 관리하는 데에 도움을 줍니다. 이 뿐 아니라, 장소나 상황에 맞게 확장이 용이하여  사람이 일일히 하기에 많은 시간이 걸리는 방역, 방범, 주문, 청소 등의 많은 작업까지 대신 할 수 있습니다.

  

- 예를 들어, 본 서비스를 영화관에 적용한다면, 티켓 확인과 상영관을 안내하고, 픽업박스에서 음식을 수령하는 등의 언택트 서비스를 영화관을 이용하는 고객에게 제공할 수 있을 것으로 기대됩니다. 이 뿐 아니라, 관리자는 언택트 출입자 관리 서비스를 이용하여 방역이나 방범을 손쉽게 할 수 있으며, 지속적으로 고객들의 상태 또한 확인할 수 있습니다.





## 3. 남들과 우리는 이게 다르다!!

---

### **< 서비스 >**

자율주행 로봇을 이용해 서비스의 질을 떨어뜨리지 않으면서 기존 서비스를 **언택트 서비스(Untact Service)**로 대체할 수 있습니다.

- 자율주행이 사람 대 사람의 대면 서비스를 피할 수 있다는 장점에서부터 안내 서비스를 기획하기로 마음먹었습니다. 전 세계적으로 코로나 바이러스가 유행하고 있는 지금, 대면 서비스를 받기 꺼려하는 사람들에게 비대면으로 서비스를 제공하면서도, 기존의 서비스의 질을 떨어뜨리지 않는다는 점이 장점입니다.
- 이 뿐 아니라 사람이 일일히 하기에 어려운 인사 관리, 방역, 방범, 주문, 청소 등의 많은 작업까지 대신 할 수 있으며, 확장 또한 용이합니다.





### **< 자율주행 기술 >**

실제 물리적인 센서 데이터 및 획득한 정보를 가지고 **여러 가지의 자율주행 기술을 사용**합니다.

- 다른 프로젝트에서는 사용하기 힘든 센서들(LiDAR, 관성 센서, 엔코더 모터, 이미지 센서)을 활용해 데이터를 가공합니다. 이 과정에서 모터 제어를 위한 PID Control, 로봇 오도메트리를 위한 여러 디지털 필터 및 추측항법 알고리즘(Madgwick Filter, Dead Reckoning 등)이 사용됩니다.
- 위에서 얻은 정보를 이용해 SLAM(Simultaneous Localization and Mapping), DWA(Dynamic Window Approach) Navigation에 활용합니다. 이렇게 2차 가공된 정보들은 자율주행 로봇의 운행에 활용되며, 이 정보들은 다시 rosserial을 통해 구동부로 전달됩니다.





### **< 프론트엔드 >**

완전한 언택트 서비스를 위한 **Bixby 사용자 인터페이스**를 사용합니다.

- 사용자와의 상호작용을 음성을 이용한 Bixby를 통해 제공합니다. 사용자가 번거로운 과정을 거치지 않고 음성만을 활용해 로봇으로부터 안내를 받을 수 있습니다.
- 자기 자신의 이동 전화를 사용함으로써 완전한 비대면 서비스를 구축했다는 데에 Bixby를 사용하는 의미가 있습니다.





### **< 백엔드 >**

**Docker**와 **Websocket**을 이용해 백엔드를 구축했습니다.

- Front-end 와 실시간 상호작용을 위한 websocket 을 사용합니다.
- 로봇과 Bixby, 로그 기록과 유저 정보 등을 각각 정보의 특징과 상태에 맞는 DB를 선택하여 저장했습니다.