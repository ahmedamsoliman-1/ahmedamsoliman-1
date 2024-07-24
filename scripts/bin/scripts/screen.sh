#!/bin/bash

create_screen() {
    local screen_name="$1"
    if ! screen -ls | grep -q "\.${screen_name}[[:space:]]"; then
        screen -dmS "$screen_name"
        echo "Screen session '$screen_name' created."
    else
        echo "Screen session '$screen_name' already exists."
    fi
}

delete_screen() {
    local screen_name="$1"
    if screen -ls | grep -q "\.${screen_name}[[:space:]]"; then
        screen -S "$screen_name" -X quit
        echo "Screen session '$screen_name' deleted."
    else
        echo "Screen session '$screen_name' does not exist."
    fi
}

list_screens() {
    screen -ls
}

attach_screen() {
    local screen_name="$1"
    if screen -ls | grep -q "\.${screen_name}[[:space:]]"; then
        screen -r "$screen_name"
    else
        echo "Screen session '$screen_name' does not exist."
    fi
}

usage() {
    echo "Usage: $0 [create|delete|list|attach] <screen_name>"
    echo "Commands:"
    echo "  create <screen_name>: Create a new screen session."
    echo "  delete <screen_name>: Delete an existing screen session."
    echo "  list: List all active screen sessions."
    echo "  attach <screen_name>: Attach to a specific screen session."
    exit 1
}

# cd AC0_load_test/ && pyenv shell aris_load && pyenv versions && python -u load-test.py 0

main() {
    local command="$1"
    local screen_name="$2"

    case "$command" in
        "create")
            create_screen "$screen_name"
            ;;
        "delete")
            delete_screen "$screen_name"
            ;;
        "list")
            list_screens
            ;;
        "attach")
            attach_screen "$screen_name"
            ;;
        *)
            usage
            ;;
    esac
}

main "$@"
