#include "stdio.h"

int uadd_ok(unsigned x, unsigned y)
{
    unsigned r = x + y;
    if (r < x || r < y)
    {
        return 0;
    }
    return 1;
}

int main()
{
    unsigned x = 1;
    unsigned y = 4294967295;
    unsigned z = 4294967294;
    unsigned r1 = uadd_ok(x, y);
    unsigned r2 = uadd_ok(x, z);

    printf("r1 = %d", r1);
    printf("r2 = %d", r2);
}