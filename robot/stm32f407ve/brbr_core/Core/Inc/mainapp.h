/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_MAINAPP_H_
#define INC_MAINAPP_H_

#include <wheel_motor.h>

#include <ros.h>

#include <std_msgs/String.h>
#include <std_msgs/Int64.h>
#include <std_msgs/Int32.h>

#include <sensor_msgs/Imu.h>
#include <sensor_msgs/JointState.h>

#include <tf/tf.h>
#include <tf/transform_broadcaster.h>

#include <nav_msgs/Odometry.h>


extern TIM_HandleTypeDef htim4;
extern TIM_HandleTypeDef htim5;

// ROS node handler
static ros::NodeHandle nh;

// ROS message struct
static std_msgs::String debug_msg;
static std_msgs::Int64 left_encoder_msg;
static std_msgs::Int64 right_encoder_msg;

static std_msgs::Int32 sec_msg;
static std_msgs::Int32 nsec_msg;

// ROS message publisher handler
static ros::Publisher debug_pub("debug", &debug_msg);
static ros::Publisher left_encoder_pub("left_encoder", &left_encoder_msg);
static ros::Publisher right_encoder_pub("right_encoder", &right_encoder_msg);

static ros::Publisher sec_pub("time_sec", &sec_msg);
static ros::Publisher nsec_pub("time_nsec", &nsec_msg);

// target callback function
void lwheel_vtargetCB(const std_msgs::Float32& msg);
void rwheel_vtargetCB(const std_msgs::Float32& msg);



extern char log_msg[200];
//float target_vel[WHEEL_NUM];


void setup(void);
void loop(void);


#endif /* INC_MAINAPP_H_ */
