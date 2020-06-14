/*
 * wheel_encoder.cpp
 *
 *  Created on: May 27, 2020
 *      Author: SwimmingLee
 */

#include "wheel_encoder.h"
#include "mainapp.h"

volatile long long left_encoder_count;
volatile long long right_encoder_count;
//char encoder_log[200];


float low_encoder_wrap;
float high_encoder_wrap;
uint8_t init_encoder;
int32_t last_diff_tick[WHEEL_NUM];
uint16_t last_tick[WHEEL_NUM];
double last_rad[WHEEL_NUM];
//double last_vel[WHEEL_NUM];

//void lwheel_vtargetCB(const std_msgs::Float32& msg) {
//	vel_target[LEFT] = msg.data;
//}
//
//
//void rwheel_vtargetCB(const std_msgs::Float32& msg) {
//	vel_target[RIGHT] = msg.data;
//}


void encoderInit() {

	__HAL_RCC_GPIOD_CLK_ENABLE();
	__HAL_RCC_GPIOA_CLK_ENABLE();
	__HAL_RCC_GPIOE_CLK_ENABLE();

	TIM_Encoder_InitTypeDef sConfig = { 0 };
	TIM_MasterConfigTypeDef sMasterConfig = { 0 };

	htim4.Instance = TIM4;
	htim4.Init.Prescaler = 0;
	htim4.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim4.Init.Period = 65535;
	htim4.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
	htim4.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
	sConfig.EncoderMode = TIM_ENCODERMODE_TI12;
	sConfig.IC1Polarity = TIM_ICPOLARITY_RISING;
	sConfig.IC1Selection = TIM_ICSELECTION_DIRECTTI;
	sConfig.IC1Prescaler = TIM_ICPSC_DIV1;
	sConfig.IC1Filter = 0;
	sConfig.IC2Polarity = TIM_ICPOLARITY_RISING;
	sConfig.IC2Selection = TIM_ICSELECTION_DIRECTTI;
	sConfig.IC2Prescaler = TIM_ICPSC_DIV1;
	sConfig.IC2Filter = 0;
	if (HAL_TIM_Encoder_Init(&htim4, &sConfig) != HAL_OK) {
		Error_Handler();
	}
	sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
	sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
	if (HAL_TIMEx_MasterConfigSynchronization(&htim4, &sMasterConfig)
			!= HAL_OK) {
		Error_Handler();
	}


	sConfig = { 0 };
	sMasterConfig = { 0 };

	htim5.Instance = TIM5;
	htim5.Init.Prescaler = 0;
	htim5.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim5.Init.Period = 65535;
	htim5.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
	htim5.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
	sConfig.EncoderMode = TIM_ENCODERMODE_TI1;
	sConfig.IC1Polarity = TIM_ICPOLARITY_RISING;
	sConfig.IC1Selection = TIM_ICSELECTION_DIRECTTI;
	sConfig.IC1Prescaler = TIM_ICPSC_DIV1;
	sConfig.IC1Filter = 0;
	sConfig.IC2Polarity = TIM_ICPOLARITY_RISING;
	sConfig.IC2Selection = TIM_ICSELECTION_DIRECTTI;
	sConfig.IC2Prescaler = TIM_ICPSC_DIV1;
	sConfig.IC2Filter = 0;
	if (HAL_TIM_Encoder_Init(&htim5, &sConfig) != HAL_OK) {
		Error_Handler();
	}
	sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
	sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
	if (HAL_TIMEx_MasterConfigSynchronization(&htim5, &sMasterConfig)
			!= HAL_OK) {
		Error_Handler();
	}


	// Encoder start
	HAL_TIM_Encoder_Start(&htim4, TIM_CHANNEL_ALL);
	HAL_TIM_Encoder_Start(&htim5, TIM_CHANNEL_ALL);

	// parameter initialize
	low_encoder_wrap = UNSIGNED16_MAX * 0.2f;
	high_encoder_wrap = UNSIGNED16_MAX * 0.8f;
	init_encoder = true;
}

// 모터가 바라보는 방향을 구함
void updateEncoderInfo(uint16_t left_tick, uint16_t right_tick) {
	uint16_t cur_tick[WHEEL_NUM] = {left_tick, right_tick };

	if (init_encoder) {
		for (int i = 0; i < WHEEL_NUM; i++) {
			last_diff_tick[i] = 0;
			last_rad[i] = 0.f;
		}

		last_tick[LEFT] = left_tick;
		last_tick[RIGHT] = right_tick;

		init_encoder = false;
		return;
	}

	cur_tick[LEFT] = left_tick;
	cur_tick[RIGHT] = right_tick;
	for (int idx = 0; idx < WHEEL_NUM; idx++) {
		if (cur_tick[idx] < low_encoder_wrap
				&& last_tick[idx] > high_encoder_wrap) {
			last_diff_tick[idx] = cur_tick[idx] + (UNSIGNED16_MAX - last_tick[idx]);
		} else if (cur_tick[idx] > high_encoder_wrap
				&& last_tick[idx] < low_encoder_wrap) {
			last_diff_tick[idx] = cur_tick[idx] - UNSIGNED16_MAX - last_tick[idx];
		} else {
			last_diff_tick[idx] = cur_tick[idx] - last_tick[idx];
		}

		last_rad[idx] += TICK2RAD * (double) last_diff_tick[idx];
	}


}
