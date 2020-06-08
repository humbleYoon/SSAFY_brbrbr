/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_MAINAPP_H_
#define INC_MAINAPP_H_

#include <ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Int64.h>
#include <wheel_motor.h>

extern TIM_HandleTypeDef htim4;
extern TIM_HandleTypeDef htim5;

// ROS node handler
static ros::NodeHandle nh;

// ROS message struct
static std_msgs::String debug_msg;
static std_msgs::Int64 left_encoder_msg;
static std_msgs::Int64 right_encoder_msg;

// ROS message publisher handler
static ros::Publisher debug_pub("debug", &debug_msg);
static ros::Publisher left_encoder_pub("left_encoder", &left_encoder_msg);
static ros::Publisher right_encoder_pub("right_encoder", &right_encoder_msg);

// ROS message subscriber handler
static ros::Subscriber<std_msgs::Float32> lwheel_vtarget_sub("/lwheel_vtarget", lwheel_vtargetCB);
static ros::Subscriber<std_msgs::Float32> rwheel_vtarget_sub("/rwheel_vtarget", rwheel_vtargetCB);


//float target_vel[WHEEL_NUM];


void setup(void);
void loop(void);


#endif /* INC_MAINAPP_H_ */
