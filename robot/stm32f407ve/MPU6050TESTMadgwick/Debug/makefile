################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Drivers/STM32F4xx_HAL_Driver/Src/subdir.mk
-include Core/Startup/subdir.mk
-include Core/Src/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(CC_DEPS)),)
-include $(CC_DEPS)
endif
ifneq ($(strip $(C++_DEPS)),)
-include $(C++_DEPS)
endif
ifneq ($(strip $(C_UPPER_DEPS)),)
-include $(C_UPPER_DEPS)
endif
ifneq ($(strip $(CXX_DEPS)),)
-include $(CXX_DEPS)
endif
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
ifneq ($(strip $(CPP_DEPS)),)
-include $(CPP_DEPS)
endif
endif

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
MPU6050TESTMadgwick.elf \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
MPU6050TESTMadgwick.list \

OBJCOPY_BIN += \
MPU6050TESTMadgwick.bin \


# All Target
all: MPU6050TESTMadgwick.elf secondary-outputs

# Tool invocations
MPU6050TESTMadgwick.elf: $(OBJS) $(USER_OBJS) C:\Users\multicampus\STM32CubeIDE\workspace_1.3.0\MPU6050TESTMadgwick\STM32F407VETX_FLASH.ld
	arm-none-eabi-g++ -o "MPU6050TESTMadgwick.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m4 -T"C:\Users\multicampus\STM32CubeIDE\workspace_1.3.0\MPU6050TESTMadgwick\STM32F407VETX_FLASH.ld" --specs=nosys.specs -Wl,-Map="MPU6050TESTMadgwick.map" -Wl,--gc-sections -static -u _printf_float --specs=nano.specs -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -Wl,--start-group -lc -lm -lstdc++ -lsupc++ -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

MPU6050TESTMadgwick.list: $(EXECUTABLES)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "MPU6050TESTMadgwick.list"
	@echo 'Finished building: $@'
	@echo ' '

MPU6050TESTMadgwick.bin: $(EXECUTABLES)
	arm-none-eabi-objcopy  -O binary $(EXECUTABLES) "MPU6050TESTMadgwick.bin"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) *
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST) $(OBJCOPY_BIN)

.PHONY: all clean dependents
.SECONDARY:

-include ../makefile.targets
