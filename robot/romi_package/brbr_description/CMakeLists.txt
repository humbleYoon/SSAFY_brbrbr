cmake_minimum_required(VERSION 3.0.2)
project(brbr_description)

find_package(catkin REQUIRED COMPONENTS
  urdf
  xacro
)

catkin_package(
#  INCLUDE_DIRS include
#  LIBRARIES brbr_description
   CATKIN_DEPENDS urdf xacro
#  DEPENDS system_lib
)

include_directories(
# include
  ${catkin_INCLUDE_DIRS}
)


## Mark cpp header files for installation
 install(DIRECTORY meshes rviz urdf
    DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
 )
