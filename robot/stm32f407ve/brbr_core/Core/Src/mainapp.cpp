/*
 * mainapp.cpp
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */
#include <math.h>

#include "mainapp.h"
#include "wheel_motor.h"
#include "wheel_encoder.h"
#include "odometry.h"
#include "imu.h"

ros::NodeHandle nh;
TIM_HandleTypeDef htim4;
TIM_HandleTypeDef htim5;
TIM_HandleTypeDef htim7;
volatile int64_t tenk_tick;

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
static ros::Subscriber<std_msgs::Float32> lwheel_vtarget_sub("/lwheel_vtarget",
		lwheel_vtargetCB);
static ros::Subscriber<std_msgs::Float32> rwheel_vtarget_sub("/rwheel_vtarget",
		rwheel_vtargetCB);

// 1MHz 단위로 인터럽트  발생!
void tenk_tick_generation(void) {

	/* USER CODE BEGIN TIM7_Init 0 */

	/* USER CODE END TIM7_Init 0 */

	TIM_MasterConfigTypeDef sMasterConfig = { 0 };

	/* USER CODE BEGIN TIM7_Init 1 */

	/* USER CODE END TIM7_Init 1 */
	htim7.Instance = TIM7;
	htim7.Init.Prescaler = 42 - 1;
	htim7.Init.CounterMode = TIM_COUNTERMODE_UP;
	htim7.Init.Period = 2 - 1;
	htim7.Init.AutoReloadPreload = TIM_AUTORELOAD_PRELOAD_DISABLE;
	if (HAL_TIM_Base_Init(&htim7) != HAL_OK) {
		Error_Handler();
	}
	sMasterConfig.MasterOutputTrigger = TIM_TRGO_RESET;
	sMasterConfig.MasterSlaveMode = TIM_MASTERSLAVEMODE_DISABLE;
	if (HAL_TIMEx_MasterConfigSynchronization(&htim7, &sMasterConfig)
			!= HAL_OK) {
		Error_Handler();
	}
	/* USER CODE BEGIN TIM7_Init 2 */
	HAL_TIM_Base_Start_IT(&htim7);
	tenk_tick = 0;
	/* USER CODE END TIM7_Init 2 */

}



void setup(void) {

	nh.initNode();
	nh.advertise(left_encoder_pub);
	nh.advertise(right_encoder_pub);

	nh.advertise(lwheel_vel_pub);
	nh.advertise(rwheel_vel_pub);

//	nh.advertise(imu_pub);
//	nh.advertise(rpy_pub);
//	nh.advertise(quat_pub);

//	nh.advertise(odom_pub);
//	nh.advertise(joint_states_pub);
//	tf_broadcaster.init(nh);

//	nh.advertise(tick_pub);

	nh.advertise(debug_pub);

	nh.subscribe(lwheel_vtarget_sub);
	nh.subscribe(rwheel_vtarget_sub);

	// 1MHz tick 생성
	tenk_tick_generation();

	// 모터 pwm, direction 초기화
	wheelDirInit();
	wheelPWMInit();

	// 엔코더 초기화
	encoderInit();

	// 오도메트리
	initOdom();
	initJointStates();

//	initIMU();
}

void loop(void) {

	static int64_t t_imu = 0;
	static int64_t t_encoder = 0;
	static int64_t t_drive = 0;

	if ((tenk_tick - t_imu) >= 5000 /*5ms*/) {
		t_imu = tenk_tick;
		//updateIMU();

//		rpy_msg.data[0];
//		rpy_msg.data[1];
//		rpy_msg.data[2];
//
//		quat_msg.data[0] = quat[0];
//		quat_msg.data[1] = quat[1];
//		quat_msg.data[2] = quat[2];
//		quat_msg.data[3] = quat[3];
//
//		imu_pub.publish(&imu_msg);
//		rpy_pub.publish(&rpy_msg);
//		quat_pub.publish(&quat_msg);
	}

	if ((tenk_tick - t_drive) >= 30000 /*30ms*/) {
		t_drive = tenk_tick;
		updateEncoderInfo(TIM4->CNT, TIM5->CNT);
		//publishDriveInformation();

		lwheel_vel_msg.data = cur_vel_ouput[LEFT];
		rwheel_vel_msg.data = cur_vel_ouput[RIGHT];

		lwheel_vel_pub.publish(&lwheel_vel_msg);
		rwheel_vel_pub.publish(&rwheel_vel_msg);
	}

	if ((tenk_tick - t_encoder) >= 3000 /*3ms*/) {
		t_encoder = tenk_tick;

		left_encoder_msg.data = TIM4->CNT;
		left_encoder_pub.publish(&left_encoder_msg);

		right_encoder_msg.data = TIM5->CNT;
		right_encoder_pub.publish(&right_encoder_msg);
	}

	calcVelocity(TIM4->CNT, TIM5->CNT);

	moveLeftWheel();
	moveRightWheel();

	nh.spinOnce();
}

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
	/* Prevent unused argument(s) compilation warning */
	if (htim->Instance == TIM7) {
		tenk_tick++;
	}
}
