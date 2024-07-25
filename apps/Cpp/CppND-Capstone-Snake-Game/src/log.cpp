#include "log.h"

#include <iostream>
#include <sstream>


//cstr, create the file and write first line 
Log::Log()
{
    //Open or create the file 
    OpenFile();

    //Go the end of the file
    log_file.seekg(0, std::ios::end);

    //Dump the first line
    if (log_file.tellg() == 0)
    {
        log_file << "Player-Score-Size" << std::endl;
    }

    // Close
    CloseFile();
}

void Log::WriteToLogFile(std::string name, int score, int siz)
{
    OpenFile();

    log_file << "Player name: " << name << ", Player score: " << score << " and snake size: " << siz << std::endl;
    
    CloseFile();
}

void Log::OpenFile()
{
    log_file.open("../data/LOG_FILE.txt", std::fstream::in | std::fstream::out | std::fstream::app);
}

void Log::CloseFile()
{
    log_file.close();
}