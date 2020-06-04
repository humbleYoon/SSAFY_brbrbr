/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_MAINAPP_H_
#define INC_MAINAPP_H_

#include <ros.h>
//#include <std_msgs/String.h>
#include <std_msgs/Int64.h>

static ros::NodeHandle nh;
//static std_msgs::String str_msg;
static std_msgs::Int64 left_encoder_msg;
static std_msgs::Int64 right_encoder_msg;
//static ros::Publisher chatter("chatter", &str_msg);
static ros::Publisher left_encoder_pub("left_encoder", &left_encoder_msg);
static ros::Publisher right_encoder_pub("right_encoder", &right_encoder_msg);
//static const char hello[] = "Hello world!";


void setup(void);
void loop(void);


#endif /* INC_MAINAPP_H_ */
