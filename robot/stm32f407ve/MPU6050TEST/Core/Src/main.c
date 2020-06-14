/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * <h2><center>&copy; Copyright (c) 2020 STMicroelectronics.
  * All rights reserved.</center></h2>
  *
  * This software component is licensed by ST under BSD 3-Clause license,
  * the "License"; You may not use this file except in compliance with the
  * License. You may obtain a copy of the License at:
  *                        opensource.org/licenses/BSD-3-Clause
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include <math.h>

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "MPU6050.h"
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define MPU6050_AXGAIN 16384.0
#define MPU6050_AYGAIN 16384.0
#define MPU6050_AZGAIN 16384.0

#define MPU6050_GXGAIN 131.072
#define MPU6050_GYGAIN 131.072
#define MPU6050_GZGAIN 131.072

#define MPU6050_AXOFFSET 0
#define MPU6050_AYOFFSET 0
#define MPU6050_AZOFFSET 0

// For Quaternion function
#define twoKpDef  (2.0f * 0.5f) // 2 * proportional gain
#define twoKiDef  (2.0f * 0.0f) // 2 * integral gain
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
I2C_HandleTypeDef hi2c1;

UART_HandleTypeDef huart1;

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_I2C1_Init(void);
static void MX_USART1_UART_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */

int16_t Accel_X, Accel_Y, Accel_Z;
int16_t Gyro_X, Gyro_Y, Gyro_Z;

float gacX, gacY, gacZ;
float roll, pitch, yaw;

uint8_t MPU6050 = 0;

void MPU6050_Write(uint8_t Address, uint8_t data){
  HAL_I2C_Mem_Write(&hi2c1, MPU6050, Address, 1, (uint8_t *)&data, 1, 10);
}

void MPU6050_Write_bits(uint8_t Address, uint8_t bitStart, uint8_t length, uint8_t data){
  uint8_t tmp = 0;
  HAL_I2C_Mem_Read(&hi2c1, MPU6050, Address, 1, (uint8_t *)&tmp, 1, 10);
  uint8_t mask = 0;
  switch(length){
    case 1: mask = 0x01; break;
    case 2: mask = 0x03; break;
    case 3: mask = 0x07; break;
    case 4: mask = 0x0F; break;
    case 5: mask = 0x1F; break;
    case 6: mask = 0x3F; break;
    case 7: mask = 0x7F; break;
    case 8: mask = 0xFF; break;
  }
  tmp &= ~(mask << bitStart);
  tmp |= (data << bitStart);
  HAL_I2C_Mem_Write(&hi2c1, MPU6050, Address, 1, (uint8_t *)&tmp, 1, 10);
}

uint8_t MPU6050_Read(uint8_t Address){
  uint8_t data;
  HAL_I2C_Mem_Read(&hi2c1, MPU6050, Address, 1, (uint8_t *)&data, 1, 10);
  return data;
}

void init_MPU6050(void){
  while(HAL_I2C_IsDeviceReady(&hi2c1, MPU6050, 10, 1000)!=HAL_OK) {
    MPU6050++;
  }
  // printf("MPU6050 I2C Address is 0x%02X(7bit value)\r\n", MPU6050>>1);

  // uint8_t temp = MPU6050_Read(MPU6050_RA_WHO_AM_I);
  // printf("Who am I = 0x%02X\r\n", temp);

  // printf("MPU6050 Initialize..... \r\n");
  printf("--------------------------------------------------------\r\n");

  HAL_Delay(100);
  /* Power Management 1, SLEEP Diasble*/
  MPU6050_Write_bits(MPU6050_RA_PWR_MGMT_1, MPU6050_PWR1_SLEEP_BIT, MPU6050_PWR1_SLEEP_LENGTH, DISABLE);
  HAL_Delay(10);
  /* Power Management 1, Internal 8MHz oscillator */
  MPU6050_Write_bits(MPU6050_RA_PWR_MGMT_1, MPU6050_PWR1_CLKSEL_BIT, MPU6050_PWR1_CLKSEL_LENGTH, MPU6050_CLOCK_INTERNAL);
  /* Gyroscope Configuration, ± 250 °/s, 131 LSB/°/s */
  MPU6050_Write_bits(MPU6050_RA_GYRO_CONFIG, MPU6050_GCONFIG_FS_SEL_BIT, MPU6050_GCONFIG_FS_SEL_LENGTH, MPU6050_GYRO_FS_250);
  /* Accelerometer Configuration, ± 2g, 16384 LSB/g */
  MPU6050_Write_bits(MPU6050_RA_ACCEL_CONFIG, MPU6050_ACONFIG_AFS_SEL_BIT, MPU6050_ACONFIG_AFS_SEL_LENGTH, MPU6050_ACCEL_FS_2);
}

void read_MPU6050_data(void){
  Accel_X = (MPU6050_Read(MPU6050_RA_ACCEL_XOUT_H)<<8) | MPU6050_Read(MPU6050_RA_ACCEL_XOUT_L);
  Accel_Y = (MPU6050_Read(MPU6050_RA_ACCEL_YOUT_H)<<8) | MPU6050_Read(MPU6050_RA_ACCEL_YOUT_L);
  Accel_Z = (MPU6050_Read(MPU6050_RA_ACCEL_ZOUT_H)<<8) | MPU6050_Read(MPU6050_RA_ACCEL_ZOUT_L);
  Gyro_X  = (MPU6050_Read(MPU6050_RA_GYRO_XOUT_H)<<8)  | MPU6050_Read(MPU6050_RA_GYRO_XOUT_L);
  Gyro_Y  = (MPU6050_Read(MPU6050_RA_GYRO_YOUT_H)<<8)  | MPU6050_Read(MPU6050_RA_GYRO_YOUT_L);
  Gyro_Z  = (MPU6050_Read(MPU6050_RA_GYRO_ZOUT_H)<<8)  | MPU6050_Read(MPU6050_RA_GYRO_ZOUT_L);
}

int _write(int32_t file, uint8_t *ptr, int32_t len){
  HAL_UART_Transmit(&huart1, ptr, len, 10);
  return len;
}

mpu6050_getRollPitchYaw(){
	roll = -atan((gacX - (float)MPU6050_AXOFFSET / 16384.0) / sqrt(gacY * gacY + gacZ * gacZ)) * 57.29577951;
	pitch = atan((gacY - (float)MPU6050_AYOFFSET / 16384.0) / sqrt(gacX * gacX + gacZ * gacZ)) * 57.29577951;
	yaw = atan(sqrt(gacX * gacX + gacZ * gacZ) / (gacZ - (float)MPU6050_AZOFFSET / 16384.0)) * 57.29577951;
}

//void mpu6050_update() {
////  axg = (float)(Accel_X - MPU6050_AXOFFSET) / MPU6050_AXGAIN;
////  ayg = (float)(Accel_Y - MPU6050_AYOFFSET) / MPU6050_AYGAIN;
////  azg = (float)(Accel_Z - MPU6050_AZOFFSET) / MPU6050_AZGAIN;
////  gxrs = (float)(Gyro_X - MPU6050_GXOFFSET) / MPU6050_GXGAIN * 0.01745329; //degree to radians
////  gyrs = (float)(Gyro_Y - MPU6050_GYOFFSET) / MPU6050_GYGAIN * 0.01745329; //degree to radians
////  gzrs = (float)(Gyro_Z - MPU6050_GZOFFSET) / MPU6050_GZGAIN * 0.01745329; //degree to radians
//  axg = (float)Accel_X / MPU6050_AXGAIN;
//  ayg = (float)Accel_Y / MPU6050_AYGAIN;
//  azg = (float)Accel_Z / MPU6050_AZGAIN;
//  gxrs = (float)Gyro_X / MPU6050_GXGAIN * 0.01745329; //degree to radians
//  gyrs = (float)Gyro_Y / MPU6050_GYGAIN * 0.01745329; //degree to radians
//  gzrs = (float)Gyro_Z / MPU6050_GZGAIN * 0.01745329; //degree to radians
//  // Degree to Radians Pi / 180 = 0.01745329 0.01745329251994329576923690768489
//}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{
  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_I2C1_Init();
  MX_USART1_UART_Init();
  /* USER CODE BEGIN 2 */
  init_MPU6050();
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	read_MPU6050_data();

	printf("Acce_X = %6d / Acce_Y = %6d / Acce_Z = %6d \r\n", Accel_X, Accel_Y, Accel_Z);
	printf("Gyro_X = %6d / Gyro_Y = %6d / Gyro_Z = %6d \r\n", Gyro_X, Gyro_Y, Gyro_Z);

	Accel_X -= MPU6050_AXOFFSET;
	Accel_Y -= MPU6050_AYOFFSET;
	Accel_Z -= MPU6050_AZOFFSET;
	gacX = (float)Accel_X / 16384.0;
	gacY = (float)Accel_Y / 16384.0;
	gacZ = (float)Accel_Z / 16384.0;

	// Value of Roll, Pitch, Yaw
	mpu6050_getRollPitchYaw();
	printf("roll : %.3f / pitch : %.3f / yaw : %.3f\r\n");
	printf("---------------------------------------------------------\r\n");
	HAL_Delay(500);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage 
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);
  /** Initializes the CPU, AHB and APB busses clocks 
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSI;
  RCC_OscInitStruct.PLL.PLLM = 8;
  RCC_OscInitStruct.PLL.PLLN = 168;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
  RCC_OscInitStruct.PLL.PLLQ = 4;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }
  /** Initializes the CPU, AHB and APB busses clocks 
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief I2C1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_I2C1_Init(void)
{

  /* USER CODE BEGIN I2C1_Init 0 */

  /* USER CODE END I2C1_Init 0 */

  /* USER CODE BEGIN I2C1_Init 1 */

  /* USER CODE END I2C1_Init 1 */
  hi2c1.Instance = I2C1;
  hi2c1.Init.ClockSpeed = 100000;
  hi2c1.Init.DutyCycle = I2C_DUTYCYCLE_2;
  hi2c1.Init.OwnAddress1 = 0;
  hi2c1.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  hi2c1.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
  hi2c1.Init.OwnAddress2 = 0;
  hi2c1.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
  hi2c1.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
  if (HAL_I2C_Init(&hi2c1) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN I2C1_Init 2 */

  /* USER CODE END I2C1_Init 2 */

}

/**
  * @brief USART1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART1_UART_Init(void)
{
  /* USER CODE BEGIN USART1_Init 0 */

  /* USER CODE END USART1_Init 0 */

  /* USER CODE BEGIN USART1_Init 1 */

  /* USER CODE END USART1_Init 1 */
  huart1.Instance = USART1;
  huart1.Init.BaudRate = 115200;
  huart1.Init.WordLength = UART_WORDLENGTH_8B;
  huart1.Init.StopBits = UART_STOPBITS_1;
  huart1.Init.Parity = UART_PARITY_NONE;
  huart1.Init.Mode = UART_MODE_TX_RX;
  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart1.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart1) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART1_Init 2 */

  /* USER CODE END USART1_Init 2 */
}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOH_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */

  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{ 
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     tex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
