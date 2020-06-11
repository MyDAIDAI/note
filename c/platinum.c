#include <stdio.h>
int main(void) {
    // float 存储浮点类型的数据
    float weight;
    float value;

    printf("Are you worth your weight in platinum?\n");
    printf("Let check it out.\n");
    printf("Please enter your weight in pounds: ");

    // 获取用户的输入
    // scanf() 函数读取用户从键盘上输入的数据
    // %f 说明 scanf() 要读取用户从键盘输入的浮点数
    // &weight 告诉 scanf() 把输入的值赋值给 weight 变量
    // &符号表明找到 weight 的变量的地址
    scanf("%f", &weight);

    value = 1700.0 * weight * 14.5833;
    // %f 打印浮点值，%.2f 中的 .2 用于精确控制输出，指定输出的浮点数只显示小数点后面两位
    printf("Your weight in platinum is worth $%.8f.\n", value);
    printf("You are easily worth that! If platinum prices drop, \n");

    printf("eat more to maintain your value.\n");
}
