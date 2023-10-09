#include "stdio.h"

float sum_elements(float a[], unsigned length)
{
    int i;
    float result = 0;
    unsigned length2 = length - 1;
    for (i = 0; i <= length - 1; i++)
    {
        result += a[i];
    }

    return result;
}

int main()
{
    unsigned length = 5;
    float a[] = {1.0, 2.0, 3.0, 4.0, 5.0};
    float sum;
    // sum = sum_elements(a, length);
    // printf("sum = %f\n", sum); // 15.000000

    sum = sum_elements(a, 0);
    printf("length sum = %f\n", sum); //  内存错误❎
}