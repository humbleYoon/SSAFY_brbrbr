cmake_minimum_required(VERSION 3.0.2)
project(br_comm)

find_package(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
)


catkin_package(
#  INCLUDE_DIRS include
#  LIBRARIES br_comm
#  CATKIN_DEPENDS roscpp rospy std_msgs
#  DEPENDS system_lib
)

include_directories(
# include
  ${catkin_INCLUDE_DIRS}
)

catkin_install_python(PROGRAMS scripts/mqtt_test.py 
	DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)
