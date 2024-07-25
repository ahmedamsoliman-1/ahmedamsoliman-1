#include <iostream>
#include "controller.h"
#include "game.h"
#include "player.h"
#include "log.h"
#include "renderer.h"

/*

1. To begin, main creates a Controller, a Game, and a Renderer object. Game stores a Snake object as part of the state.
2. main calls Game::Run to start the game loop.

main.cpp
This is the entrypoint for the program. The main function in this file sets variables such as the window height and width and the number of frames per 
second at which the game will be played. The main also creates Renderer, Controller, and Game objects, and calls the Game::Run method to start the game 
loop.

*/

int main() 
{
  Player player;
  Log log;

  // Introduce infinite while loop to let the player start again optionally 
  while(true)
  {
      constexpr std::size_t kFramesPerSecond{60};                     //Game running at 60 frame per second 
      constexpr std::size_t kMsPerFrame{1000 / kFramesPerSecond};     // milli second per frame 
      constexpr std::size_t kScreenWidth{640};
      constexpr std::size_t kScreenHeight{640};
      constexpr std::size_t kGridWidth{32};
      constexpr std::size_t kGridHeight{32};
    
      Renderer renderer(kScreenWidth, kScreenHeight, kGridWidth, kGridHeight);
      Controller controller;
      Game game(kGridWidth, kGridHeight);
      game.Run(controller, renderer, kMsPerFrame, player);
    
      std::string name = player.GetName();
      int score = game.GetScore();
      int size = game.GetSize();
    
      std::cout << "Game has terminated successfully!\n";
      std::cout << "Score: " << score << "\n";
      std::cout << "Size: " << size << "\n";

      //Write to log file
      log.WriteToLogFile(name, score, size);

      //Kill the renderer 
      renderer.~Renderer();
        
      // Determine if the player want to play again !
      bool play_again = player.PlayAgain();
      
      if (!play_again)
      {
          break;
      }
  }
  return 0;
}