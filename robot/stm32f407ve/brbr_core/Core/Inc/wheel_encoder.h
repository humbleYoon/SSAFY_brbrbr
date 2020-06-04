/*
 * wheel_encoder.h
 *
 *  Created on: May 27, 2020
 *      Author: multicampus
 */

#ifndef INC_WHEEL_ENCODER_H_
#define INC_WHEEL_ENCODER_H_

#define MOTOR_ENCODER_GPIO_Port 			GPIOC
#define MOTOR_LEFT_ENCODER1_Pin 			GPIO_PIN_0
#define MOTOR_LEFT_ENCODER2_Pin 			GPIO_PIN_1
#define MOTOR_RIGHT_ENCODER1_Pin 			GPIO_PIN_2
#define MOTOR_RIGHT_ENCODER2_Pin 			GPIO_PIN_3


#include "main.h"
#include "stm32f4xx_hal.h"


extern volatile long long left_encoder_count;
extern volatile long long right_encoder_count;

void encoderInit();


#endif /* INC_WHEEL_ENCODER_H_ */
