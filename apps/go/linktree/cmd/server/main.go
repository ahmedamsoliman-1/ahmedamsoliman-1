package main

import (
    "log"
    "net/http"
    "linktree-app/internal/handlers"
)

func main() {
    http.HandleFunc("/", handlers.Home)
    fs := http.FileServer(http.Dir("./web/static"))
    http.Handle("/static/", http.StripPrefix("/static/", fs))

    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
