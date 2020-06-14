################################################################################
# CMake
################################################################################
cmake_minimum_required(VERSION 2.8.3)
project(br_bringup)

set(CMAKE_CXX_FLAGS "-std=c++11 ${CMAKE_CXX_FLAGS}")

################################################################################
# Packages
################################################################################
find_package(catkin REQUIRED COMPONENTS
  roscpp
  std_msgs
  sensor_msgs
  geometry_msgs
  nav_msgs
  robot_state_publisher
  tf
)


generate_messages(DEPENDENCIES std_msgs sensor_msgs geometry_msgs)

################################################################################
# Catkin specific configuration
################################################################################
catkin_package(
  LIBRARIES AR_bringup
  CATKIN_DEPENDS roscpp std_msgs sensor_msgs geometry_msgs nav_msgs
)

################################################################################
# Build
################################################################################
include_directories(
  ${catkin_INCLUDE_DIRS}
)


add_executable(twist_to_motors src/twist_to_motors.cpp)
add_dependencies(twist_to_motors ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(twist_to_motors ${catkin_LIBRARIES})

################################################################################
# Install
################################################################################

install(DIRECTORY launch
        DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)

################################################################################
# Test
################################################################################
