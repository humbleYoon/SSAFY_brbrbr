### 200525_Jetson Nano Thumbs Project



- Camera Check

```bash
$ sudo apt install v4l-utils  
$ ls /dev/video*  # 카메라 번호 확인
$ v4l2-ctl -d /dev/video0 --list-formats-ext  # 해상도 확인
```

```bash
$ lsusb  # USB list 출력
```

```bash
# jetson-inference 재설치
$ cd jetson-inference/build/aarch64/bin
$ ./imagenet-camera --camera=/dev/video0
```



[공홈자습서?](https://developer.nvidia.com/embedded/learn/get-started-jetson-nano-devkit#next)

ubuntu browser에서 JupyterLab server 접속 **192.168.55.1:8888**

`nvdli-nano/hello_camera/usb_camera.ipynb`



git error: RPC failed

`git config --global http.postBuffer 524288000`



- [Thumbs Project](https://courses.nvidia.com/courses/course-v1:DLI+C-RX-02+V1/courseware/b2e02e999d9247eb8e33e893ca052206/26aa9f8bdaa948d9b068a8275c89e546/?child=first)

`nvdli-nano/classification/classification_interactive.ipynb`



학습을 조금 시켜봤는데 내 손은 인식하고 이수영 손은 인식이 잘 안되는 ... 

어떤 모양을 학습시킬 지 얘기해보고 내일 할래