### 200527_Jetson Nano Object Detection



이전에 jetson-inference 폴더를 삭제해버렸어서 다시 클론받음

```bash
$ sudo apt-get update
$ sudo apt-get install git cmake
$ git clone https://github.com/dusty-nv/jetson-inference
$ cd jetson-inference
$ git submodule update --init
$ sudo apt-get install libpython3-dev python3-numpy
```

그리고 왜 build 폴더가 없는지 알았다.. 내가 만들고 설정하는 거였음

```bash
$ cd jetson-inference    # omit if working directory is already jetson-inference/ from above
$ mkdir build
$ cd build
$ cmake ../

$ cd jetson-inference/tools
$ ./download-models.sh

$ cd jetson-inference/build
$ ./install-pytorch.sh
```

코드가 업데이트 되면 아래 단계도 다시 해주기

```bash
$ cd jetson-inference/build          # omit if working directory is already build/ from above
$ make
$ sudo make install
$ sudo ldconfig
```



#### Detecting Objects from the Command Line

```bash
$ detectnet-console.py data/images/peds_0.jpg output.jpg
```

모델을 처음 돌릴 때 TensorRT가 네트워크를 최적화하는 데 시간이 좀 오래 걸린다.  최적화되면 디스크에 캐시되어 이후에는 빨리 로드 된다.

예제 사진으로 객체 인식이 잘 됨 . 내 사진으로 하려고 하니 `loadImageRGBA`에서 에러가 난다. . .



#### Running the Live Camera Detection Demo

```bash
$ sudo apt-get install v4l-utils
$ v4l2-ctl --list-formats-ext

$ detectnet-camera.py --network=coco-dog
??? 안됨.
```

`Exception: jetson.utils -- failed to create glDisplay device`

-> display 연결 필요



#### Coding Your Own Object Detection Program

my-detection.py 파일을 생성하고 실행

```bash
$ python my-detection.py
```

오왕 ㅎㅎ 객체를 인식합니당. 현재 서비스에서는 사물이 있다는 것만 인식하면 되므로 가벼운 모델을 써도 될 것 같다 ?!





