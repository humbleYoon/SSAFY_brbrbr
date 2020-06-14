/*
 * imu.h
 *
 *  Created on: 2020. 6. 8.
 *      Author: LeeSooYoung
 */




#ifndef INC_IMU_H_
#define INC_IMU_H_

//#include <ros.h>
#include <wheel_motor.h>
#include <sensor_msgs/Imu.h>
#include <std_msgs/Float32MultiArray.h>


extern sensor_msgs::Imu imu_msg;
extern std_msgs::Float32MultiArray rpy_msg;
extern std_msgs::Float32MultiArray quat_msg;

extern const int MPU6050_addr;
extern volatile int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ, MagX, MagY, MagZ;
extern volatile float ax, ay, az, gx, gy, gz;
extern volatile float quat[4];
extern float aRes, gRes, mRes;

extern ros::Publisher imu_pub;
extern ros::Publisher rpy_pub;
extern ros::Publisher quat_pub;


void initIMU();
void updateIMU();


#endif
