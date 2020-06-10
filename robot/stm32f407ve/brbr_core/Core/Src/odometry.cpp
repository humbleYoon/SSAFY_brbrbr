/*
 * odometry.cpp
 *
 *  Created on: 2020. 6. 8.
 *      Author: LeeSooYoung
 */

#include "odometry.h"
#include "wheel_encoder.h"
#include "wheel_motor.h"
#include "mainapp.h"

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
	//static double joint_states_eff[WHEEL_NUM] = { 0.0, 0.0 };

	joint_states_pos[LEFT] = last_rad[LEFT];
	joint_states_pos[RIGHT] = last_rad[RIGHT];

	joint_states_vel[LEFT] = last_vel_output[LEFT];
	joint_states_vel[RIGHT] = last_vel_output[RIGHT];

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


/********************************************************************************************
  ros Time
********************************************************************************************/
ros::Time addMircos(ros::Time &t, uint32_t _micros)
{
  uint32_t sec, nsec;

  sec = _micros / 1000000 + t.sec;
  nsec = _micros % 1000000 + 1000 * (t.nsec / 1000);

  if(nsec >= 1e9)
  {
    sec++;
    nsec--;
  }
  return ros::Time(sec, nsec);
}


void publishDriveInformation() {
	static int64_t t_cur_odom = tenk_tick, t_last_odom = 0;
	static int64_t step_time;


	ros::Time stamp_now = nh.now();
//	ros::Time stamp_now = addMircos(t, _micros);

	step_time = t_cur_odom - t_last_odom;
	t_last_odom = t_cur_odom;
	calcOdomerty(step_time);

	updateOdometry();
	odom.header.stamp = stamp_now;
	odom_pub.publish(&odom);

	updateTF(odom_tf);
	odom_tf.header.stamp  = stamp_now;
	tf_broadcaster.sendTransform(odom_tf);

	updateJointStates();
	joint_states.header.stamp = stamp_now;
	joint_states_pub.publish(&joint_states);
}



bool calcOdomerty(double diff_time) {
	double wheel_l, wheel_r; // roatation value of wheel [rad]
	double delta_s, theta, delta_theta;

	static double last_theta = 0.0;
	//v = translational velocity [m/s], w = roatational velocityy [rad/s]
	double v, w;
	double step_time;

	wheel_l = wheel_r = 0.0;
	delta_s = delta_theta = theta = 0.0;
	v = w = 0.0;
	step_time = 0.0;

	step_time = diff_time;

	if (step_time == 0)
		return false;

	wheel_l = TICK2RAD * (double) last_diff_tick[LEFT];
	wheel_r = TICK2RAD * (double) last_diff_tick[RIGHT];

	if (isnan(wheel_l))
		wheel_l = 0.0;

	if (isnan(wheel_r))
		wheel_r = 0.0;

	delta_s = WHEEL_RADIUS * (wheel_r + wheel_l) * 0.5;
	theta = WHEEL_RADIUS * (wheel_r - wheel_l) / WHEEL_SEPARATION;
//	theta = atan2(quat[1] * quat[2] + quat[0] * quat[3], 0.5f - quat[2] * quat[2] - quat[3] * quat[3]);

	delta_theta = theta - last_theta;

	v = delta_s / step_time;
	w = delta_theta / step_time;

	last_vel_output[LEFT] = wheel_l / step_time;
	last_vel_output[RIGHT] = wheel_r / step_time;

	//compute odometric pose
	odom_pose[0] += delta_s * cos(odom_pose[2] + (delta_theta * 0.5));
	odom_pose[1] += delta_s * sin(odom_pose[2] + (delta_theta * 0.5));
	odom_pose[2] += delta_theta;

	//compute odometric instantaneuouos velocity
	odom_vel[0] = v;
	odom_vel[1] = 0.0;
	odom_vel[2] = w;

	last_theta = theta;

	return true;
}


