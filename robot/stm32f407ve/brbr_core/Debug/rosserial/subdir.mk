################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../rosserial/duration.cpp \
../rosserial/time.cpp 

OBJS += \
./rosserial/duration.o \
./rosserial/time.o 

CPP_DEPS += \
./rosserial/duration.d \
./rosserial/time.d 


# Each subdirectory must supply rules for building sources it contributes
rosserial/duration.o: C:/Users/multicampus/STM32CubeIDE/workspace_1.3.0/brbr_core/rosserial/duration.cpp
	arm-none-eabi-g++ "$<" -mcpu=cortex-m4 -std=gnu++14 -g3 -DUSE_HAL_DRIVER -DDEBUG -DSTM32F407xx -c -I../Drivers/CMSIS/Include -I../Drivers/STM32F4xx_HAL_Driver/Inc -I../Core/Inc -I"C:/Users/multicampus/STM32CubeIDE/workspace_1.3.0/brbr_core/rosserial" -I../Drivers/CMSIS/Device/ST/STM32F4xx/Include -I../Drivers/STM32F4xx_HAL_Driver/Inc/Legacy -O0 -ffunction-sections -fdata-sections -fno-exceptions -fno-rtti -fno-threadsafe-statics -fno-use-cxa-atexit -Wall -fstack-usage -MMD -MP -MF"rosserial/duration.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
rosserial/time.o: C:/Users/multicampus/STM32CubeIDE/workspace_1.3.0/brbr_core/rosserial/time.cpp
	arm-none-eabi-g++ "$<" -mcpu=cortex-m4 -std=gnu++14 -g3 -DUSE_HAL_DRIVER -DDEBUG -DSTM32F407xx -c -I../Drivers/CMSIS/Include -I../Drivers/STM32F4xx_HAL_Driver/Inc -I../Core/Inc -I"C:/Users/multicampus/STM32CubeIDE/workspace_1.3.0/brbr_core/rosserial" -I../Drivers/CMSIS/Device/ST/STM32F4xx/Include -I../Drivers/STM32F4xx_HAL_Driver/Inc/Legacy -O0 -ffunction-sections -fdata-sections -fno-exceptions -fno-rtti -fno-threadsafe-statics -fno-use-cxa-atexit -Wall -fstack-usage -MMD -MP -MF"rosserial/time.d" -MT"$@" --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

