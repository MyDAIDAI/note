cmake_minimum_required(VERSION 3.14)
project(c C)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(c
        toobig.c)
#add_executable(print1.c)
