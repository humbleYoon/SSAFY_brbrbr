cmake_minimum_required(VERSION 2.8.3)
project(br_teleop)

find_package(catkin REQUIRED COMPONENTS
  geometry_msgs
  roscpp
)

catkin_package(
#  INCLUDE_DIRS include
  LIBRARIES br_teleop
  CATKIN_DEPENDS geometry_msgs roscpp
#  DEPENDS system_lib
)

include_directories(
# include
  ${catkin_INCLUDE_DIRS}
)


add_executable(br_teleop_key src/br_teleop_key.cpp)
add_dependencies(br_teleop_key ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})
target_link_libraries(br_teleop_key ${catkin_LIBRARIES})

