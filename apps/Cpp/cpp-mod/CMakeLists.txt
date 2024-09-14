cmake_minimum_required(VERSION 3.10)
project(cpp-mode-bin)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Include directories
include_directories(include)

# Add the source files
add_executable(cpp-mode-bin src/main.cpp src/lib.cpp)
