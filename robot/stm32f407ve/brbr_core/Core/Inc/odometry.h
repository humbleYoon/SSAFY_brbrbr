/*
 * odometry.h
 *
 *  Created on: 2020. 6. 8.
 *      Author: LeeSooYoung
 */

#ifndef INC_ODOMETRY_H_
#define INC_ODOMETRY_H_

#include <nav_msgs/Odometry.h>
#include <sensor_msgs/JointState.h>


extern nav_msgs::Odometry odom;
extern sensor_msgs::JointState joint_states;

extern ros::Publisher odom_pub("odom", &odom);
extern ros::Publisher joint_states_pub("joint_states", &joint_states);


void initJointStates();

void updateOdometry();
void updateJointStates();
void updateTF(geometry_msgs::TransformStamped& odom_tf);


#endif /* INC_ODOMETRY_H_ */
