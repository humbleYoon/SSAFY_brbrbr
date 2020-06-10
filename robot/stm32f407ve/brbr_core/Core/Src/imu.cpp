#ifndef INC_MPU6050_H_
#define INC_MPU6050_H_

#include "imu.h"



const int MPU6050_addr = 0x68;
volatile int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ, MagX, MagY, MagZ;
volatile float ax, ay, az, gx, gy, gz;
volatile float quat[4];
float aRes, gRes, mRes;


sensor_msgs::Imu imu_msg;
std_msgs::Float32MultiArray rpy_msg;
std_msgs::Float32MultiArray quat_msg;

ros::Publisher imu_pub("imu", &imu_msg);
ros::Publisher rpy_pub("rpy", &rpy_msg);
ros::Publisher quat_pub("quat", &quat_msg);

void initIMU() {
	rpy_msg.data_length = 3;
	rpy_msg.data = new float[3];

	quat_msg.data_length = 4;
	quat_msg.data = new float[4];
}

void updateIMU() {
	imu_msg.header.stamp = nh.now();
	imu_msg.header.frame_id = "imu_link";

	imu_msg.angular_velocity.x = GyX;
	imu_msg.angular_velocity.y = GyY;
	imu_msg.angular_velocity.z = GyZ;
	imu_msg.angular_velocity_covariance[0] = 0.02;
	imu_msg.angular_velocity_covariance[1] = 0;
	imu_msg.angular_velocity_covariance[2] = 0;
	imu_msg.angular_velocity_covariance[3] = 0;
	imu_msg.angular_velocity_covariance[4] = 0.02;
	imu_msg.angular_velocity_covariance[5] = 0;
	imu_msg.angular_velocity_covariance[6] = 0;
	imu_msg.angular_velocity_covariance[7] = 0;
	imu_msg.angular_velocity_covariance[8] = 0.02;

	imu_msg.linear_acceleration.x = AcX;
	imu_msg.linear_acceleration.y = AcY;
	imu_msg.linear_acceleration.z = AcZ;
	imu_msg.linear_acceleration_covariance[0] = 0.04;
	imu_msg.linear_acceleration_covariance[1] = 0;
	imu_msg.linear_acceleration_covariance[2] = 0;
	imu_msg.linear_acceleration_covariance[3] = 0;
	imu_msg.linear_acceleration_covariance[4] = 0.04;
	imu_msg.linear_acceleration_covariance[5] = 0;
	imu_msg.linear_acceleration_covariance[6] = 0;
	imu_msg.linear_acceleration_covariance[7] = 0;
	imu_msg.linear_acceleration_covariance[8] = 0.04;

	imu_msg.orientation.w = quat[0];
	imu_msg.orientation.x = quat[1];
	imu_msg.orientation.y = quat[2];
	imu_msg.orientation.z = quat[3];

	imu_msg.orientation_covariance[0] = 0.0025;
	imu_msg.orientation_covariance[1] = 0;
	imu_msg.orientation_covariance[2] = 0;
	imu_msg.orientation_covariance[3] = 0;
	imu_msg.orientation_covariance[4] = 0.0025;
	imu_msg.orientation_covariance[5] = 0;
	imu_msg.orientation_covariance[6] = 0;
	imu_msg.orientation_covariance[7] = 0;
	imu_msg.orientation_covariance[8] = 0.0025;
}

#endif /* INC_MPU6050_H_ */
