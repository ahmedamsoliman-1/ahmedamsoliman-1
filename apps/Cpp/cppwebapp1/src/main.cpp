#include "crow.h"

int main()
{
    crow::SimpleApp app;

    // Define a route for the root URL "/"
    CROW_ROUTE(app, "/")
    ([](){
        return "Hello, World!";
    });

    // Run the app on port 8080
    app.port(8080).multithreaded().run();

    return 0;
}

