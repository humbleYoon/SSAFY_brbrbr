#include "ros/ros.h"
#include "std_msgs/Float32.h"
#include "std_msgs/Float64.h"

#include <tf/transform_broadcaster.h>
#include <nav_msgs/Odometry.h>
#include <math.h>


class TwistToMotors
{
public:
    TwistToMotors();
    void spin();

private:
    ros::NodeHandle nh;
    
    ros::Publisher lmotor_pub;
    ros::Publisher rmotor_pub;

    ros::Subscriber cmd_vel_sub;

    float left;
    float right;

    float ticks_since_target;
    double timeout_ticks;

    double w;
    double rate;

    float dx, dy, dr;

    void init_variables();
    void get_parameters();
    
    void spinOnce();
    void twistCallback(const geometry_msgs::Twist &twist_aux);
};

TwistToMotors::TwistToMotors()
{
    init_variables();
    get_parameters();

    ROS_INFO("Started Twist to Motor node");

    cmd_vel_sub = nh.subscribe("cmd_vel", 5, &TwistToMotors::twistCallback, this);

    lmotor_pub = nh.advertise<std_msgs::Float32>("lwheel_vtarget", 50);
    rmotor_pub = nh.advertise<std_msgs::Float32>("rwheel_vtarget", 50);
}

void TwistToMotors::init_variables()
{
    left = 0;
    right = 0;

    dx = dy = dr = 0;

    //여기 밑에 3개의 수치는 정확하게 해야한다. 
    w = 0.293;
    rate = 10;
    timeout_ticks = 2;
}

void TwistToMotors::get_parameters()
{
    if(nh.getParam("rate", rate)){
        ROS_INFO_STREAM("Rate from param" << rate);
    }

    if(nh.getParam("timeout_ticks", timeout_ticks))
    {
        ROS_INFO_STREAM("timeout_ticks from param" << timeout_ticks);
    }

    if(nh.getParam("base_width", w)){
        ROS_INFO_STREAM("Base_width from param" << w);
    }
}


void TwistToMotors::spin()
{
    ros::Rate r(rate);
    ros::Rate idle(10);

    ros::Time the = ros::Time::now();

    ticks_since_target = timeout_ticks;

    while(ros::ok())
    {
        while(ros::ok() && (ticks_since_target <= timeout_ticks))
        {
            spinOnce();
            r.sleep();
        }

        ros::spinOnce();
        idle.sleep();
    }
}

void TwistToMotors::spinOnce()
{
    right = (1.0f * dx) + (dr * w / 2.f);
    left = (1.0f * dx) - (dr * w /2.f);

    std_msgs::Float32 left_;
    std_msgs::Float32 right_;

    left_.data = left * 100000;
    right_.data = right * 100000;

    lmotor_pub.publish(left_);
    rmotor_pub.publish(right_);

    ticks_since_target += 1;

    ros::spinOnce();
}

void TwistToMotors::twistCallback(const geometry_msgs::Twist &msg)
{
    ticks_since_target = 0;

    dx = msg.linear.x;
    //dy = msg.linear.y; ///어차피 0인거 굳이 받을 필요가 있나?
    dr = msg.angular.z;

}

int main(int argc, char** argv)
{
    ros::init(argc, argv, "twist_to_motors");
    TwistToMotors obj;

    obj.spin();
}
