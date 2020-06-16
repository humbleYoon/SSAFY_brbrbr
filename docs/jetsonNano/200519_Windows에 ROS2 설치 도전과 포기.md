### 200519_Windows에 ROS2 설치 도전과 포기



#### Chocolatey

윈도우에서 맥의 brew나 리눅스의 apt-get, yum 같은 패키지매니저를 쓸 수 있게 해줌.



#### ROS2

visual C++, OpenSSL, OpenCV, dependencies, ... 

![...](C:\GIT\LABSSAFY\s02p31a302\docs\ayl\설치한게없지만기록하기위해남기는사진.png)

이렇게 뭔가를 많이 깔았지만 ... ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ

ROS2 시작하려니 뭐 이런 에러가 뜬다.

```shell
[connext_cmake_module] Warning: The location at which Connext was found when the workspace was built [[C:\Program Files\rti_connext_dds-5.3.1]] does not point to a valid directory, and the NDDSHOME environment variable has not been set. Support for Connext will not be available.
[opensplice_cmake_module] Warning: The location at which OpenSplice was found when the workspace was built [[C:\dev\opensplice\HDE\x86_64.win64\]] does not point to a valid directory, and the OSPL_HOME environment variable has not been set. Support for OpenSplice will not be available.
```

OpenSplice, .. 등등 뭘 더 깔아서 [할 수 있는거 같긴 한데](http://www.programmersought.com/article/4954146258/)



플젝 시 호환이나 ... 개발 중 리눅스 명령어 사용 등 리눅스 환경이 편할 거 같아 그냥 던지기로 한다.

ㅠ_ㅠ