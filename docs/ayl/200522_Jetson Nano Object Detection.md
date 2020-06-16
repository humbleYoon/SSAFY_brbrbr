### 200522_Jetson Nano Object Detection



시간이 또 바뀌어있네 ㅇㅅaㅇ 에러를  안 보는 날이 없네욤 !

sudo apt update 하니 또

```shell
E: Could not get lock /var/lib/apt/lists/lock - open (11: Resource temporarily unavailable)
E: Unable to lock directory /var/lib/apt/lists/
```

라고 떠서 [이렇게](https://kkn1220.tistory.com/123)

```bash
$ sudo rm /var/lib/apt/lists/* -vf
$ sudo apt-get update
```



Non-ASCII character '\xeb' in file  -> 파이썬 코드 내의 한글 인식 못한것. 코드첫줄에 적어주기

```python
# -*- coding: utf-8 -*-
```





오늘은 [여기](https://github.com/dusty-nv/jetson-inference/)를 따라 해보겠습니닷

- Hello AI World

  - Setting up Jetson with JetPack

  - [Building the Project from Source](https://github.com/dusty-nv/jetson-inference/blob/master/docs/building-repo-2.md)

    ```bash
    $ sudo apt-get update
    $ sudo apt-get install git cmake libpython3-dev python3-numpy
    $ git clone --recursive https://github.com/dusty-nv/jetson-inference
    $ cd jetson-inference
    $ mkdir build
    $ cd build
    $ cmake ../
    $ make -j$(nproc)
    $ sudo make install
    $ sudo ldconfig
    ```

  - [Classifying Images with ImageNet](https://github.com/dusty-nv/jetson-inference/blob/master/docs/imagenet-console-2.md)

    - [Using the Console Program on Jetson](https://github.com/dusty-nv/jetson-inference/blob/master/docs/imagenet-console-2.md#using-the-console-program-on-jetson)

    ```bash
    $ cd jetson-inference/build/aarch64/bin
    $ ./imagenet-console.py --network=googlenet images/orange_0.jpg output_0.jpg
    ```

    - [Coding Your Own Image Recognition Program (Python)](https://github.com/dusty-nv/jetson-inference/blob/master/docs/imagenet-example-python-2.md)

    ```bash
    $ cd ~/
    $ mkdir my-recognition-python
    $ cd my-recognition-python
    $ touch my-recognition.py
    $ chmod +x my-recognition.py
    $ wget https://github.com/dusty-nv/jetson-inference/raw/master/data/images/black_bear.jpg 
    $ wget https://github.com/dusty-nv/jetson-inference/raw/master/data/images/brown_bear.jpg
    $ wget https://github.com/dusty-nv/jetson-inference/raw/master/data/images/polar_bear.jpg 
    ```

    my-recognition.py에 vi로 코드 입력

    ```bash
    $ ./my-recognition.py polar_bear.jpg
    ```

    - [Running the Live Camera Recognition Demo](https://github.com/dusty-nv/jetson-inference/blob/master/docs/imagenet-camera-2.md)

    ```bash
    
    ```

    

