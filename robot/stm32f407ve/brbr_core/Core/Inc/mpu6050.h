/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: LeeSooYoung
 */

#ifndef INC_MPU6050_H_
#define INC_MPU6050_H_

#include <ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Int64.h>
#include <std_msgs/Int32.h>
#include <wheel_motor.h>
#include <sensor_msgs/Imu.h>

extern sensor_msgs::Imu imu_msg;
extern sensor_msgs::Float32MultiArray rpy_msg;
extern sensor_msgs::Float32MultiArray quat_msg;

extern ros::Publisher imu_pub("imu", &imu_msg);
extern ros::Publisher rpy_pub("rpy", &rpy_msg);
extern ros::Publisher quat_pub("quat", &quat_msg);


void initMPU6050();
void updateIMU();


#endif /* INC_MPU6050_H_ */
