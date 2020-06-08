/*
 * mainapp.cpp
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#include "mainapp.h"
#include "wheel_motor.h"
#include "wheel_encoder.h"
#include <ros.h>
#include <std_msgs/String.h>
#include <std_msgs/Int64.h>
#include <string.h>

TIM_HandleTypeDef htim4;
TIM_HandleTypeDef htim5;
char log_msg[200];

void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart) {
	nh.getHardware()->flush();
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
	nh.getHardware()->reset_rbuf();
}


void lwheel_vtargetCB(const std_msgs::Float32 &msg) {
	vel_target[LEFT] = msg.data;

}

void rwheel_vtargetCB(const std_msgs::Float32 &msg) {
	vel_target[RIGHT] = msg.data;
}


// ROS message subscriber handler
static ros::Subscriber<std_msgs::Float32> lwheel_vtarget_sub("/lwheel_vtarget", lwheel_vtargetCB);
static ros::Subscriber<std_msgs::Float32> rwheel_vtarget_sub("/rwheel_vtarget", rwheel_vtargetCB);

void setup(void) {
	wheelDirInit();
	wheelPWMInit();

	encoderInit();

	nh.initNode();
	nh.advertise(left_encoder_pub);
	nh.advertise(right_encoder_pub);
	nh.advertise(debug_pub);

//	nh.advertise(sec_pub);
//	nh.advertise(nsec_pub);

	nh.subscribe(lwheel_vtarget_sub);
	nh.subscribe(rwheel_vtarget_sub);
	moveStop();
}

void loop(void) {
//	moveStop();
//	HAL_Delay(3000);
//
//	moveForword();
//	HAL_Delay(3000);

//	if (left_encoder_msg.data != left_encoder_count) {
//		strcpy(encoder_log, "left encoder start");
//	}


	left_encoder_msg.data = TIM4->CNT;
	left_encoder_pub.publish(&left_encoder_msg);

	right_encoder_msg.data = TIM5->CNT;
	right_encoder_pub.publish(&right_encoder_msg);

//	ros::Time t = nh.now();
//	dddddsec_msg.data = (uint64_t)1;
//	dddddnsec_msg.data = (uint64_t)1;
//
//	sec_pub.publish(&dddddsec_msg);
//	nsec_pub.publish(&dddddnsec_msg);
//
	debug_msg.data = log_msg;
	debug_pub.publish(&debug_msg);


	moveLeftWheel();
	moveRightWheel();

	nh.spinOnce();
	HAL_Delay(1000);

}
