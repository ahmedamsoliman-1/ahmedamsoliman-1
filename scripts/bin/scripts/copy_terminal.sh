#!/bin/bash

# Check if enough arguments are provided
# if [ "$#" -ne 1 ]; then
#     echo "Usage: $0 <param>"
#     exit 1
# fi

# param=$1

# Check the value of the parameter and copy accordingly
# case $param in
#     "all" | "dgx" | "hosts" | "clear" | "cs2" | "cs2v1" | "cs2-mac" | "cs2-mac-2" | "ahmed")
#         cp "conf/$param/settings.json" "/Users/ahmed.soliman/Library/Application Support/Code/User/"
#         echo "File settings.json for $param copied."
#         ;;
#     *)
#         echo "Invalid parameter. Please use: all, dgx, or hosts."
#         exit 1
#         ;;
# esac




cp "conf/$param/settings.json" "/Users/ahmed.soliman/Library/Application Support/Code/User/"
echo "File settings.json for $param copied to '/Users/ahmed.soliman/Library/Application Support/Code/User/'"