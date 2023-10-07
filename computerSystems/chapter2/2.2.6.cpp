
#include <stdio.h>

typedef unsigned char *byte_pointer;

void show_bytes(byte_pointer start, size_t len)
{
    size_t i;
    for (i = 0; i < len; ++i)
    {
        printf(" %.2x", start[i]);
    }
    printf("\n");
}

int main()
{
    short sx = -12345;
    unsigned uy = sx; // 将short有符号类型数字转换为int无符号类型

    printf("uy = %u:\t", uy); // uy = 4294954951:	 c7 cf ff ff
    show_bytes((byte_pointer)&uy, sizeof(unsigned));
}