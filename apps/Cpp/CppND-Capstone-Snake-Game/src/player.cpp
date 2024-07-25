#include <iostream>
#include "player.h"


std::string Player::GetName()
{
    return player_name;
}

Player::Player()
{
    std::string name;
    std::cout << "Enter Your Name Please: ";
    std::cin >> name;
    player_name = name;
}

void Player::ConvertToLowerCase(std::string &play_again)
{
    //Change input from the user to lower case
    //Using pass-by-reference 
    for (char &i : play_again)
    {
        i = tolower(static_cast<unsigned char>(i));
    }
}

bool Player::PlayAgain()
{
    while(true)
    {
        std::string play_again;
        std::cout << "Would you like to play agin? [y/n]: " << std::endl;
        std::cin >> play_again;

        ConvertToLowerCase(play_again);
    
        if (play_again == "n" || play_again == "no")
        {
            return false;
        }
        else if (play_again == "y" || play_again == "yes")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}