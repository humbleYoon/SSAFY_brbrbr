/*
 * wheel_encoder.cpp
 *
 *  Created on: May 27, 2020
 *      Author: SwimmingLee
 */

#include "wheel_encoder.h"

volatile long long left_encoder_count;
volatile long long right_encoder_count;

void encoderInit() {
	/*Configure GPIO pins : PC0 PC1 */
	GPIO_InitTypeDef GPIO_InitStruct = { 0 };

	GPIO_InitStruct.Pin = MOTOR_LEFT_ENCODER2_Pin | MOTOR_RIGHT_ENCODER2_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	GPIO_InitStruct.Pull = GPIO_PULLUP;
	GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_VERY_HIGH;
	HAL_GPIO_Init(MOTOR_ENCODER_GPIO_Port, &GPIO_InitStruct);

	GPIO_InitStruct.Pin = MOTOR_LEFT_ENCODER1_Pin | MOTOR_RIGHT_ENCODER1_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_IT_RISING;
	GPIO_InitStruct.Pull = GPIO_NOPULL;
	HAL_GPIO_Init(MOTOR_ENCODER_GPIO_Port, &GPIO_InitStruct);

	/* EXTI interrupt init*/
	HAL_NVIC_SetPriority(EXTI0_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(EXTI0_IRQn);

	HAL_NVIC_SetPriority(EXTI2_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(EXTI2_IRQn);

	left_encoder_count = 10;
	right_encoder_count = 10;

}
