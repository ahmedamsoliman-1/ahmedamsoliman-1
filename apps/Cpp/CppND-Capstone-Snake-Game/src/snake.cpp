#include "snake.h"
#include <cmath>
#include <iostream>

void Snake::Update() 
{
      SDL_Point prev_cell{
          static_cast<int>(head_x),
          static_cast<int>(
              head_y)};  // We first capture the head's cell before updating.
      UpdateHead();
      SDL_Point current_cell{
          static_cast<int>(head_x),
          static_cast<int>(head_y)};  // Capture the head's cell after updating.

      // Update all of the body vector items if the snake head has moved to a new
      // cell.
      if (current_cell.x != prev_cell.x || current_cell.y != prev_cell.y) 
      {
        UpdateBody(current_cell, prev_cell);
      }
}

void Snake::UpdateHead() 
{
      switch (direction) 
      {
        case Direction::kUp:
          head_y -= speed;    //Decrease the head y by the speed !
          break;

        case Direction::kDown:
          head_y += speed;
          break;

        case Direction::kLeft:
          head_x -= speed;
          break;

        case Direction::kRight:
          head_x += speed;
          break;
      }

      // Wrap the Snake around to the beginning if going off of the screen.
      head_x = fmod(head_x + grid_width, grid_width);
      head_y = fmod(head_y + grid_height, grid_height);
      // This done to prevent ending with negative value for head_x and y
}

//WW
void Snake::UpdateBody(SDL_Point &current_head_cell, SDL_Point &prev_head_cell) 
{
      // Add previous head location to vector
      body.push_back(prev_head_cell);

      if (!growing) 
      {
        // Remove the tail from the vector.
        body.erase(body.begin());
      } else 
      {
        growing = false;
        size++;
      }

      // Check if the snake has died.
      for (auto const &item : body) 
      {
        if (current_head_cell.x == item.x && current_head_cell.y == item.y) 
        {
          std::cout << "Game Over" << std::endl;
          alive = false;
        }
      }
      // SnakeStatus(alive, current_head_cell, body);
}

void Snake::SetAlive()
{
    alive = false;
}

void SnakeStatus(bool &status, SDL_Point &current_head_cell, std::vector<SDL_Point> body)
{
    //Find weather the snake is alive or not 
    for(auto const &i : body)
    {
        if (current_head_cell.x == i.x && current_head_cell.y == i.y)
        {
          status = false;
        }
    }
}

//Called in game class
void Snake::GrowBody()
{ 
      growing = true; 
}

// Inefficient method to check if cell is occupied by snake.
bool Snake::SnakeCell(int x, int y) 
{
      if (x == static_cast<int>(head_x) && y == static_cast<int>(head_y)) 
      {
        return true;
      }
      for (auto const &item : body) 
      {
        if (x == item.x && y == item.y) 
        {
          return true;
        }
      }
      return false;
}