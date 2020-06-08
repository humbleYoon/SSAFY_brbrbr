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

TIM_HandleTypeDef htim4;
TIM_HandleTypeDef htim5;

void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart) {
	nh.getHardware()->flush();
}

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
	nh.getHardware()->reset_rbuf();
}



void setup(void) {
	wheelDirInit();
	wheelPWMInit();

	encoderInit();
//	encoderInit1();

	nh.initNode();
	nh.advertise(left_encoder_pub);
	nh.advertise(right_encoder_pub);
	nh.advertise(debug_pub);

	moveStop();
}

void loop(void) {
//	moveStop();
//	HAL_Delay(3000);
//
	moveForword();
//	HAL_Delay(3000);

//	if (left_encoder_msg.data != left_encoder_count) {
//		strcpy(encoder_log, "left encoder start");
//	}
	left_encoder_msg.data = TIM4->CNT;
	left_encoder_pub.publish(&left_encoder_msg);

	right_encoder_msg.data = TIM5->CNT;
	right_encoder_pub.publish(&right_encoder_msg);

	debug_msg.data = encoder_log;
	debug_pub.publish(&debug_msg);

	HAL_Delay(100);
	nh.spinOnce();
}
