#ifndef LOG_H
#define LOG_H

#include <fstream>
#include <string>

class Log 
{
public:
    Log();
    void WriteToLogFile(std::string name, int score, int siz);
    void OpenFile();
    void CloseFile();

private:
    std::fstream log_file;


};

#endif