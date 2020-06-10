/*
 * odometry.h
 *
 *  Created on: 2020. 6. 8.
 *      Author: LeeSooYoung
 */

#ifndef INC_ODOMETRY_H_
#define INC_ODOMETRY_H_

#include <ros.h>
#include <nav_msgs/Odometry.h>
#include <sensor_msgs/JointState.h>
#include <tf/tf.h>
#include <tf/transform_broadcaster.h>

#define LFET	0
#define RIGHT	1

extern float odom_pose[3];
extern double odom_vel[3];

extern nav_msgs::Odometry odom;
extern geometry_msgs::TransformStamped odom_tf;
extern tf::TransformBroadcaster tf_broadcaster;
extern sensor_msgs::JointState joint_states;

extern ros::Publisher odom_pub;
extern ros::Publisher joint_states_pub;

void initOdom();
void initJointStates();

void updateOdometry();
void updateJointStates();
void updateTF(geometry_msgs::TransformStamped &odom_tf);
void publishDriveInformation();
bool calcOdomerty(double diff_time);

ros::Time addMircos(ros::Time &t, uint32_t _micros);
#endif /* INC_ODOMETRY_H_ */
