CXX = g++
CXXFLAGS = -Iinclude -std=c++17
LDFLAGS =

SRC = src/main.cpp src/lib.cpp
OBJ = $(SRC:.cpp=.o)
TARGET = cpp-mode-bin

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CXX) -o $@ $^ $(LDFLAGS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c -o $@ $<

clean:
	rm -f $(OBJ) $(TARGET)
