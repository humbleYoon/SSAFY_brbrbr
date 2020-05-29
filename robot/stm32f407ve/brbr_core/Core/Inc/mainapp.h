/*
 * mainapp.h
 *
 *  Created on: May 26, 2020
 *      Author: multicampus
 */

#ifndef INC_MAINAPP_H_
#define INC_MAINAPP_H_

#include <ros.h>
#include <std_msgs/String.h>
//
static ros::NodeHandle nh;
static std_msgs::String str_msg;
static ros::Publisher chatter("chatter", &str_msg);
static const char hello[] = "Hello world!";



void setup(void);
void loop(void);


#endif /* INC_MAINAPP_H_ */
