/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_MAINAPP_H_
#define INC_MAINAPP_H_

#define WHEEL_SEPARATION 0.393

#include "stm32f4xx_hal.h"



#include <string.h>

#include "wheel_motor.h"
#include "wheel_encoder.h"

#include <ros.h>

#include <std_msgs/String.h>
#include <std_msgs/Int64.h>
#include <std_msgs/Int32.h>
#include <std_msgs/Float32.h>

#include <sensor_msgs/Imu.h>
#include <sensor_msgs/JointState.h>

#include <tf/tf.h>
#include <tf/transform_broadcaster.h>

#include <nav_msgs/Odometry.h>


extern TIM_HandleTypeDef htim4;
extern TIM_HandleTypeDef htim5;
extern TIM_HandleTypeDef htim7;

// ROS node handler
extern ros::NodeHandle nh;

// ROS message struct
static std_msgs::String debug_msg;
static std_msgs::Int64 left_encoder_msg;
static std_msgs::Int64 right_encoder_msg;
static std_msgs::Int64 tick_msg;

extern volatile int64_t tenk_tick;

static std_msgs::Int64 test1_msg;
static std_msgs::Int64 test2_msg;


static std_msgs::Float32 lwheel_vel_msg;
static std_msgs::Float32 rwheel_vel_msg;

// ROS message publisher handler
static ros::Publisher debug_pub("debug", &debug_msg);
static ros::Publisher left_encoder_pub("left_encoder", &left_encoder_msg);
static ros::Publisher right_encoder_pub("right_encoder", &right_encoder_msg);
static ros::Publisher tick_pub("tick", &tick_msg);
static ros::Publisher lwheel_vel_pub("lwheel_vel", &lwheel_vel_msg);
static ros::Publisher rwheel_vel_pub("rwheel_vel", &rwheel_vel_msg);


void tenk_tick_generation(void);
void setup(void);
void loop(void);


#endif /* INC_MAINAPP_H_ */
