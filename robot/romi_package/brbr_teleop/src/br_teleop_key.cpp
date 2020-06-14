#include "ros/ros.h"
#include "geometry_msgs/Twist.h"
#include <termio.h>
#include <iostream>

using namespace std;

class AR_teleop{
public:
    AR_teleop();
    void spin();

private:
    ros::NodeHandle nh;
    ros::Publisher AR_teleop_pub;
    geometry_msgs::Twist twist;

    std::string strmsg;
    int status;
    float target_linear_vel;
    float target_angular_vel;
    float control_linear_vel;
    float control_angular_vel;
    char key;
    int rate;

    char getKey();
    void print_vel();
    void update();
    float min(float numA, float numB);
};

AR_teleop::AR_teleop()
{
    AR_teleop_pub = nh.advertise<geometry_msgs::Twist>("/cmd_vel", 5);

    target_linear_vel = 0;
    target_angular_vel = 0;
    control_linear_vel = 0;
    control_angular_vel = 0;

    rate = 5;

    strmsg = \
    std::string("Control Your AR    \n")+ \
    std::string("--------------------\n") + \
    std::string("Moving around:      \n") + \
    std::string("       w            \n") + \
    std::string("   a   s   d        \n") + \
    std::string("       x            \n") + \
    std::string("                    \n") + \
    std::string("w/x : increase/decrease linear velocity \n") + \
    std::string("a/d : increase/decrease angular velocity \n") + \
    std::string("space key, s : force stop \n\n") + \
    std::string("max linear:  0.17, max angular:  2.2 \n") + \
    std::string("min linear: -0.17, max angular: -2.2 \n\n") + \
    std::string("CTRL-C to quit\n\n");

    std::cout << strmsg;
}

void AR_teleop::spin()
{

    ros::Rate loop_rate(rate);

    while(ros::ok())
    {
        update();
        loop_rate.sleep();
    }
}

char AR_teleop::getKey()
{
    int ch;
    struct termios buf, save;
    tcgetattr(0, &save);
    buf = save;
    buf.c_lflag &= ~(ICANON|ECHO);
    buf.c_cc[VMIN] = 1;
    buf.c_cc[VTIME] = 0;
    tcsetattr(0, TCSAFLUSH, &buf);
    ch = getchar();
    tcsetattr(0, TCSAFLUSH, &save);
    return ch;
}

void AR_teleop::print_vel()
{
    if(target_angular_vel > 2.2)
    {
        target_angular_vel = 2.2;
    }
    else if(target_angular_vel < -2.2)
    {
        target_angular_vel = -2.2;
    }

    if(target_linear_vel > 0.2)
    {
        target_linear_vel = 0.2;
    }
    else if(target_linear_vel < -0.2)
    {
        target_linear_vel = -0.2;
    }
	
    cout.precision(3);
	
    cout << "Currently: linear vel ";
    cout .width(6);
    cout << target_linear_vel;
    cout << "  angular vel ";
    cout .width(6);
    cout << target_angular_vel << endl;
    //ROS_INFO("currently: liner vel %2.2f  angular vel %2.2f ", target_linear_vel, target_angular_vel);
}

void AR_teleop::update()
{
    key = getKey();
    switch(key)
    {
    case 'w':
        target_linear_vel += 0.01;
        status++;
        print_vel();
        break;
    case 'x':
        target_linear_vel -= 0.01;
        status++;
        print_vel();
        break;
    case 'a':
        target_angular_vel += 0.1;
        status++;
        print_vel();
        break;
    case 'd':
        target_angular_vel -= 0.1;
        status++;
        print_vel();
        break;
    case 'q':
        //reserved
        break;
    case 'e':
        //reserved
        break;
    case 's':
    case ' ':
        target_linear_vel = 0;
        control_linear_vel = 0;
        target_angular_vel = 0;
        control_angular_vel = 0;
        print_vel();
        break;
    }
/*
    if(target_linear_vel > control_linear_vel)
    { //속도 증가는 느르게
        control_linear_vel = min(target_linear_vel, control_linear_vel + (0.01f/4.0f));    
    }
    else
    { //정지는 빠르게
        control_linear_vel = target_linear_vel;
    }
    if(target_angular_vel > control_angular_vel)
    {
        control_angular_vel = min(target_angular_vel, control_angular_vel + (0.1f/4.0f) );
    }
    else
    { //정지는 빠르게
        control_angular_vel = target_angular_vel;
    }
*/
    twist.linear.x = target_linear_vel; // control_linear_vel;
    twist.linear.y = 0;
    twist.linear.z = 0;

    twist.angular.x = 0;
    twist.angular.y = 0;
    twist.angular.z = target_angular_vel; //control_angular_vel;
    AR_teleop_pub.publish(twist);

}

float AR_teleop::min(float numA, float numB)
{
    return numA<numB ? numA : numB;
}

int main(int argc, char **argv)
{
    ros::init(argc, argv, "AR_teleop_key");
    AR_teleop obj;
    obj.spin();

    return 0;

}
