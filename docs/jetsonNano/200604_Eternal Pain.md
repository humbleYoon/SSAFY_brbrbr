### 200604_Eternal Pain



뭔가 다른 [링크](https://github.com/decisionforce/TPN)를 참조해보고 있다

```bash
git clone https://github.com/decisionforce/TPN.git
pip install cython
python setup.py develop
```

requirements install - mmcv 를 설치하려니 [opencv](https://webnautes.tistory.com/1186)에서 에러 발생

```bash
pkg-config --modversion opencv  # not found로 패스
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install build-essential cmake
sudo apt-get install pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libpng-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libxvidcore-dev libx264-dev libxine2-dev
sudo apt-get install libv4l-dev v4l-utils
sudo apt-get install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev
sudo apt-get install libgtk2.0-dev
sudo apt-get install mesa-utils libgl1-mesa-dri libgtkgl2.0-dev libgtkglext1-dev
sudo apt-get install libatlas-base-dev gfortran libeigen3-dev
sudo apt-get install python2.7-dev python3-dev python-numpy python3-numpy

mkdir opencv
cd opencv
wget -O opencv.zip https://github.com/opencv/opencv/archive/4.2.0.zip
unzip opencv.zip
wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.2.0.zip
unzip opencv_contrib.zip

cd opencv-4.0.1/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=OFF -D WITH_IPP=OFF -D WITH_1394=OFF -D BUILD_WITH_DEBUG_INFO=OFF -D BUILD_DOCS=OFF -D INSTALL_C_EXAMPLES=ON -D INSTALL_PYTHON_EXAMPLES=ON -D BUILD_EXAMPLES=OFF -D BUILD_TESTS=OFF -D BUILD_PERF_TESTS=OFF -D WITH_QT=OFF -D WITH_GTK=ON -D WITH_OPENGL=ON -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-4.2.0/modules -D WITH_V4L=ON  -D WITH_FFMPEG=ON -D WITH_XINE=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D OPENCV_GENERATE_PKGCONFIG=ON ../

cat /proc/cpuinfo | grep processor | wc -l
time make -j4
sudo make install
cat /etc/ld.so.conf.d/*

sudo ldconfig
g++ -o facedetect /usr/local/share/opencv4/samples/cpp/facedetect.cpp $(pkg-config opencv4 --libs --cflags)
```

..하란대로 했는데 왜 안되는지..



구글 techable machine으로 갈아탈련다. jetson nano의 의미가 더욱 없어진다.. 휴...

내일 react page 시작하면서 통신도 해보고 바로 입혀봐야겠다.




