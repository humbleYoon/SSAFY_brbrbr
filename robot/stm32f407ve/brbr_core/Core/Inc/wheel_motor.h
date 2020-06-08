/*
 * wheel_motot.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_WHEEL_MOTOR_H_
#define INC_WHEEL_MOTOR_H_

#define MOTOR_LEFT_DIR1_Pin 			GPIO_PIN_2
#define MOTOR_LEFT_DIR1_GPIO_Port 		GPIOE
#define MOTOR_LEFT_DIR2_Pin 			GPIO_PIN_3
#define MOTOR_LEFT_DIR2_GPIO_Port 		GPIOE
#define MOTOR_RIGHT_DIR1_Pin 			GPIO_PIN_4
#define MOTOR_RIGHT_DIR1_GPIO_Port 		GPIOE
#define MOTOR_RIGHT_DIR2_Pin 			GPIO_PIN_5
#define MOTOR_RIGHT_DIR2_GPIO_Port 		GPIOE

#define WHEEL_NUM						2
#define LEFT							0
#define RIGHT							1
#define ENCODER_MIN						-2147483648
#define ENCODER_MAX						2147483648

#include "main.h"
#include "stm32f4xx_hal.h"


static TIM_HandleTypeDef htim3;
extern float vel_target[WHEEL_NUM];
extern float vel_ouput[WHEEL_NUM];

// 모터 방향과 PWM 조절
void wheelDirInit();
void wheelPWMInit();

// 로봇 이동 테스트용도
void moveStop();
void moveForword();
void moveBackword();
void moveLeft();
void moveRight();

// 로봇 방향 조절
void driveLeftWheel(float servo_value);
void driveRightWheel(float servo_value);

// PID 컨트롤 초기화
void PIDcontrollInit();
// PID 컨트롤에서 사용할 모터 속도 계산하기
void calcVelocity();
// PID 컨트롤
void doPID();

// target callback function
void lwheel_vtargetCB(const std_msgs::Float32& msg);
void rwheel_vtargetCB(const std_msgs::Float32& msg);


#endif /* INC_WHEEL_MOTOR_H_ */
