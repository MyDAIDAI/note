#include "stdio.h"

int main()
{
    int x = 53191;
    short sx = (short)x;
    int y = sx;

    printf("x = %d", x);   // 53191
    printf("sx = %d", sx); // -12345
    printf("y = %d", y);   // -12345
}
