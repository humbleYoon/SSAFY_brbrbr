### 200520_Jetson Nano Wifi 설정하기



웨

않

되



[수영이가 알려준 터틀봇3 예제](http://emanual.robotis.com/docs/en/platform/turtlebot3/ros2_setup/)는 우선 인터넷 연결이 안돼있어 할 수 없음 ㅠ ㅠ



무선네트워크 패키지 다운로드

```shell
$ sudo apt-get install wireless-tools wpasupplicant
```

무선네트워크

```shell
$ iwconfig  # 인터페이스 확인
$ sudo lshw -C Network  # 랜카드 상태 확인
$ ifconfig wlan0 up  # 활성화
```

무선 네트워크 스캐닝

```shell
$ iwlist wlan0 scan
```



- 얘들은 안 돼

암호 없는 거

```shell
$ sudo iw wlan0 scan  # 이걸 하면 No such device (-19)
```

암호 있는 거

```shell
$ sudo iw wlan0 scan  # 여전히 No such device ...
$ sudo wpa_passphrase GCAMP0824G > wpa_supplicant.conf  # 안넘어감
```



- 얘들도 ?

```shell
$ sudo service network-manager restart
$ nmcli dev wifi list
$ nmcli dev wifi con 'SSID' password 'wifi-password'
# Error: Failed to add/activate new connection: Not authorized to control networking.
!!!!!!!!!!!????????????
$ sudo nmcli dev wifi con 'SSID' password 'wifi-password'
```

되었다 [오예](http://dveamer.github.io/ubuntu/HowToConnectWIFIOnCommandLine.html)

