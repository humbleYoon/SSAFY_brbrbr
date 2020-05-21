### 200521_Jetson Nano PyTorch 설치



뭔가 설치 하려고 했더니 계속 인증 오류라고 에러가 떠서

구글링을 해보니 시간 문제인듯 확인해보니 2018년으로 설정돼있음..

```bash
$ sudo date -s "2020-05-21 14:06:00"
$ sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
$ date
```



#### [python 3.6 설치](https://aliwo.github.io/swblog/linux/ubuntu/ubuntu-new-python/#)

```bash
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
여기서 에러가 나는데.. 우선 진행해보장
W: GPG error: http://packages.ros.org/ros/ubuntu bionic InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY F42ED6FBAB17C654
E: The repository 'http://packages.ros.org/ros/ubuntu bionic InRelease' is not signed.
N: Updating from such a repository can't be done securely, and is therefore disabled by default.
N: See apt-secure(8) manpage for repository creation and user configuration details.

$ sudo apt update
$ sudo apt install python3.7

python3.6 --version
Python 3.6.9
```

- 별명짓기

```bash
alias python=python3.6
alias pip=pip3
```

- 가상환경 설정

```bash
$ sudo apt install python3-pip
$ sudo apt install python3.7-venv
$ python -m venv venv
$ source venv/bin/activate

$ pip --version
끝부분에 3.6이 뜬다!
```



#### [PyTorch for Jetson Nano](https://forums.developer.nvidia.com/t/pytorch-for-jetson-nano-version-1-5-0-now-available/72048)

- Python 3.6 에서 

```bash
wget https://nvidia.box.com/shared/static/ncgzus5o23uck9i5oth2n8n06k340l6k.whl -O torch-1.4.0-cp36-cp36m-linux_aarch64.whl
sudo apt-get install python3-pip libopenblas-base libopenmpi-dev 
pip3 install Cython
pip3 install numpy torch-1.4.0-cp36-cp36m-linux_aarch64.whl
```

- torchvision

```bash
$ sudo apt-get install libjpeg-dev zlib1g-dev
$ git clone --branch v0.5.0 https://github.com/pytorch/vision torchvision   
# PyTorch 1.4 -> v0.5.0
$ cd torchvision
$ sudo python setup.py install
# 여기서 No module Error "setuptools"
# sudo apt-get install -y python3-setuptools
# 해결하니 이젠 torch가 없다함. 얘는 CUDA를 받아야 하는 모양

$ cd ../  # attempting to load torchvision from build dir will result in import error
$ pip install 'pillow<7' # always needed for Python 2.7, not needed torchvision v0.5.0+ with Python 3.6
```

- NVIDIA driver

```bash

```

