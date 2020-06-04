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

	nh.initNode();
	nh.advertise(left_encoder_pub);
	nh.advertise(right_encoder_pub);
//	nh.advertise(chatter);
}

void loop(void) {
	moveStop();
	HAL_Delay(3000);

	moveForword();
	HAL_Delay(3000);

//	moveBackword();
//	HAL_Delay(3000);

//	str_msg.data = hello;
//	chatter.publish(&str_msg);

	left_encoder_msg.data = left_encoder_count;
	left_encoder_pub.publish(&left_encoder_msg);

	right_encoder_msg.data = right_encoder_count;
	right_encoder_pub.publish(&right_encoder_msg);
	nh.spinOnce();
}
