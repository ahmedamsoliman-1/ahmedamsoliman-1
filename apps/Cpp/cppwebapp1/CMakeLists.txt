cmake_minimum_required(VERSION 3.10)

# Set the project name
project(cppwebapp1)

# Specify the C++ standard
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add the include directories
include_directories(../cpp_external/Crow/include)
include_directories(../cpp_external/asio/asio/include)

# Add the source files
set(SOURCES src/main.cpp)

# Add the executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link pthread library
target_link_libraries(${PROJECT_NAME} pthread)
