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

#include "main.h"
#include "stm32f4xx_hal.h"
#include "wheel_encoder.h"
//#include <ros.h>
#include <math.h>
#include <string.h>
#include "mainapp.h"

static TIM_HandleTypeDef htim3;

extern float vel_target[WHEEL_NUM];
extern float cur_vel_ouput[WHEEL_NUM];
extern float last_vel_output[WHEEL_NUM];

// motor encoder
extern float wheel_prev[WHEEL_NUM];
extern float wheel_latest[WHEEL_NUM];
extern float wheel_mult[WHEEL_NUM];

// motor PID control gain parameter
extern float vel_Kp[WHEEL_NUM];
extern float vel_Ki[WHEEL_NUM];
extern float vel_Kd[WHEEL_NUM];

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
void calcVelocity(uint16_t left_tick, uint16_t right_tick);
void doPID();

// 모터 조작하기
void moveLeftWheel();
void moveRightWheel();



#endif /* INC_WHEEL_MOTOR_H_ */
