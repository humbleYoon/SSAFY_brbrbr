/*
 * odometry.cpp
 *
 *  Created on: 2020. 6. 8.
 *      Author: LeeSooYoung
 */

#include "odometry.h"
#include "wheel_encoder.h"
#include "wheel_motor.h"

float odom_pose[3];
double odom_vel[3];

nav_msgs::Odometry odom;
geometry_msgs::TransformStamped odom_tf;
tf::TransformBroadcaster tf_broadcaster;
sensor_msgs::JointState joint_states;

ros::Publisher odom_pub("odom", &odom);
ros::Publisher joint_states_pub("joint_states", &joint_states);

void initOdom() {
//	init_encoder = true;

	for (int index = 0; index < 3; index++) {
		odom_pose[index] = 0.0;
		odom_vel[index] = 0.0;
	}

	odom.pose.pose.position.x = 0.0;
	odom.pose.pose.position.x = 0.0;
	odom.pose.pose.position.x = 0.0;

	odom.pose.pose.orientation.x = 0.0;
	odom.pose.pose.orientation.x = 0.0;
	odom.pose.pose.orientation.x = 0.0;
	odom.pose.pose.orientation.x = 0.0;

	odom.twist.twist.linear.x = 0.0;
	odom.twist.twist.angular.z = 0.0;
}

void initJointStates() {
	static char *joint_states_name[2] = { (char*) "wheel_left_joint",
			(char*) "wheel_right_joint" };

	joint_states.header.frame_id = "base_link";
	joint_states.name = joint_states_name;

	joint_states.name_length = WHEEL_NUM;
	joint_states.position_length = WHEEL_NUM;
	joint_states.velocity_length = WHEEL_NUM;
	joint_states.effort_length = WHEEL_NUM;
}

void updateOdometry() {
	odom.header.frame_id = "odom";
	odom.child_frame_id = "base_link";

	odom.pose.pose.position.x = odom_pose[0];
	odom.pose.pose.position.y = odom_pose[1];
	odom.pose.pose.position.z = 0;
	odom.pose.pose.orientation = tf::createQuaternionFromYaw(odom_pose[2]);

	odom.twist.twist.linear.x = odom_vel[0];
	odom.twist.twist.angular.z = odom_vel[2];
}

void updateJointStates() {
	static double joint_states_pos[WHEEL_NUM] = { 0.0, 0.0 };
	static double joint_states_vel[WHEEL_NUM] = { 0.0, 0.0 };
	static double joint_states_eff[WHEEL_NUM] = { 0.0, 0.0 };

	joint_states_pos[LEFT] = last_rad[LEFT];
	joint_states_pos[RIGHT] = last_rad[RIGHT];

	joint_states_vel[LEFT] = last_vel[LEFT];
	joint_states_vel[RIGHT] = last_vel[RIGHT];

	joint_states.position = joint_states_pos;
	joint_states.velocity = joint_states_vel;
}

void updateTF(geometry_msgs::TransformStamped &odom_tf) {
	odom_tf.header = odom.header;
	odom_tf.child_frame_id = "base_footprint";
	odom_tf.transform.translation.x = odom.pose.pose.position.x;
	odom_tf.transform.translation.y = odom.pose.pose.position.y;
	odom_tf.transform.translation.z = odom.pose.pose.position.z;
	odom_tf.transform.rotation = odom.pose.pose.orientation;
}

