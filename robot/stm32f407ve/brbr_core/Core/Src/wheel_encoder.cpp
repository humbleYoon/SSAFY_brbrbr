/*
 * wheel_encoder.cpp
 *
 *  Created on: May 27, 2020
 *      Author: SwimmingLee
 */

#include "wheel_encoder.h"

int encoderInit() {
	/*Configure GPIO pins : PC0 PC1 */
	GPIO_InitTypeDef GPIO_InitStruct = { 0 };

	GPIO_InitStruct.Pin = MOTOR_LEFT_ENCODER_Pin | MOTOR_RIGHT_ENCODER_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_IT_RISING;
	GPIO_InitStruct.Pull = GPIO_NOPULL;
	HAL_GPIO_Init(MOTOR_ENCODER_GPIO_Port, &GPIO_InitStruct);

	/* EXTI interrupt init*/
	HAL_NVIC_SetPriority(EXTI0_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(EXTI0_IRQn);

	HAL_NVIC_SetPriority(EXTI1_IRQn, 0, 0);
	HAL_NVIC_EnableIRQ(EXTI1_IRQn);
}
