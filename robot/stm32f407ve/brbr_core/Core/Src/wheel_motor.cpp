/*
 * wheel_motor.cpp
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */
#include "wheel_motor.h"

extern TIM_HandleTypeDef htim3;

void wheelDirInit() {
	GPIO_InitTypeDef GPIO_InitStruct = { 0 };

	/* GPIO Ports Clock Enable */
	__HAL_RCC_GPIOE_CLK_ENABLE();
	__HAL_RCC_GPIOH_CLK_ENABLE();
	__HAL_RCC_GPIOA_CLK_ENABLE();
	__HAL_RCC_GPIOB_CLK_ENABLE();

	/*Configure GPIO pin Output Level */
	HAL_GPIO_WritePin(GPIOE,
			MOTOR_LEFT_DIR1_Pin | MOTOR_LEFT_DIR2_Pin | MOTOR_RIGHT_DIR1_Pin
					| MOTOR_RIGHT_DIR2_Pin, GPIO_PIN_RESET);

	/*Configure GPIO pins : MOTOR_A_DIR1_Pin MOTOR_A_DIR2_Pin MOTOR_B_DIR1_Pin MOTOR_B_DIR2_Pin */
	GPIO_InitStruct.Pin = MOTOR_LEFT_DIR1_Pin | MOTOR_LEFT_DIR2_Pin
			| MOTOR_RIGHT_DIR1_Pin | MOTOR_RIGHT_DIR2_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	GPIO_InitStruct.Pull = GPIO_NOPULL;
	GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
	HAL_GPIO_Init(GPIOE, &GPIO_InitStruct);

}

void wheelPWMInit() {
	TIM_ClockConfigTypeDef sClockSourceConfig = { 0 };
	TIM_MasterConfigTypeDef sMasterConfig = { 0 };
	TIM_OC_InitTypeDef sConfigOC = { 0 };

	htim3.Instance = TIM3;
	htim3.Init.Prescaler = 20 - 1;
	htim3.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim3.Init.Period = 42000 - 1;
	htim3.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
	htim3.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
	if (HAL_TIM_Base_Init(&htim3) != HAL_OK) {
//		Error_Handler();
	}
	sClockSourceConfig.ClockSource = TIM_CLOCKSOURCE_INTERNAL;
	if (HAL_TIM_ConfigClockSource(&htim3, &sClockSourceConfig) != HAL_OK) {
//		Error_Handler();
	}
	if (HAL_TIM_PWM_Init(&htim3) != HAL_OK) {
//		Error_Handler();
	}
	sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
	sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
	if (HAL_TIMEx_MasterConfigSynchronization(&htim3, &sMasterConfig)
			!= HAL_OK) {
//		Error_Handler();
	}
	sConfigOC.OCMode = TIM_OCMODE_PWM1;
	sConfigOC.Pulse = 0;
	sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
	sConfigOC.OCFastMode = TIM_OCFAST_DISABLE;
	if (HAL_TIM_PWM_ConfigChannel(&htim3, &sConfigOC, TIM_CHANNEL_1)
			!= HAL_OK) {
//		Error_Handler();
	}
	if (HAL_TIM_PWM_ConfigChannel(&htim3, &sConfigOC, TIM_CHANNEL_2)
			!= HAL_OK) {
//		Error_Handler();
	}

	HAL_TIM_MspPostInit(&htim3);
}

void moveStop() {
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);

	TIM3->CCR1 = (uint16_t) 0;
	TIM3->CCR2 = (uint16_t) 0;

}

void moveForword() {
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);

	TIM3->CCR1 = (uint16_t) 21000 - 1;
	TIM3->CCR2 = (uint16_t) 21000 - 1;
}

void moveBackword() {
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);

	TIM3->CCR1 = (uint16_t) 21000 - 1;
	TIM3->CCR2 = (uint16_t) 21000 - 1;
}

void moveLeft() {
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);

	TIM3->CCR1 = (uint16_t) 21000 - 1;
	TIM3->CCR2 = (uint16_t) 0;
}

void moveRight() {
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);
	HAL_GPIO_WritePin(MOTOR_LEFT_DIR1_GPIO_Port, MOTOR_RIGHT_DIR1_Pin, GPIO_PIN_SET);

	TIM3->CCR1 = (uint16_t) 0;
	TIM3->CCR2 = (uint16_t) 21000 - 1;
}

static float encoder_low_wrap;
static float encoder_high_wrap;

static float pid_dt;
static float prev_vel_error[WHEEL_NUM];
static float vel_error[WHEEL_NUM];
static float vel_intergral[WHEEL_NUM];
static float vel_derivative[WHEEL_NUM];
static float Kp[WHEEL_NUM];
static float Ki[WHEEL_NUM];
static float Kd[WHEEL_NUM];

static float vel_target[WHEEL_NUM];
static float vel_ouput[WHEEL_NUM];

//void PIDcontrollInit() {
//	encoder_low_wrap = ((long long) ENCODER_MAX - ENCODER_MIN)
//			* 0.3f+ ENCODER_MIN;
//	encoder_high_wrap = ((long long) ENCODER_MAX - ENCODER_MIN)
//			* 0.3f+ ENCODER_MIN;
//
//	for (int i = 0; i < WHEEL_NUM; i++) {
//		vel_target[i] = 0.f;
//		cur_vel[i] = 0.0;
//		vel_output[i] = 0.f;
//
//		vel_error[i] = 0.f;
//		previous_vel_error[i] = 0.f;
//		vel_intergral[i] = 0.f;
//		vel_derivative[i] = 0.f;
//
//		wheel_prev[i] = 0.0;
//		wheel_latest[i] = 0.0;
//		wheel_mult[i] = 0;
//
//	}
//
//	Kp[LEFT] = 550.f;
//	Ki[LEFT] = 200.f;
//	Kd[LEFT] = 40.f;
//
//	Kp[RIGHT] = 550.f;
//	Ki[RIGHT] = 200.f;
//	Kd[RIGHT] = 40.f;
//
//}
//
//void doPID() {
//	static uint32_t prev_PID_time[WHEEL_NUM] = { 0, 0 };
//	static uint32_t cur_PID_time[WHEEL_NUM] = { 0, 0 };
//	static uint32_t PID_time[WHEEL_NUL] = { 0, 0 };
//
//	for (int i = 0; i < WHEEL_NUM; i++) {
//		cur_PID_time[i] = 0;
//		PID_time[i] = cur_PID_time[i] - prev_PID_time[i];
//		prev_PID_time[i] = cur_PID_time[i];
//
//		float pid_dt = (float) PID_time[i] * 0.000001f;
//
//		vel_error[i] = vel_target[i] - cur_vel[i];
//		vel_intergarl[i] = vel_intergral[i] + (vel_error[i] * pid_dt);
//		vel_derivative[i] = (cur_vel[i] - prev_vel_error[i]) / pid_dt;
//	}
