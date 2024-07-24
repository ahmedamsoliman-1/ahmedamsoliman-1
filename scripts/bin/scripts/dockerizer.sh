#!/bin/bash



#!/bin/bash

if [[ $# -eq 0 ]]; then
  echo "Please provide a valid argument: 'containers', 'images', 'delete_all', 'front', 'back' or 'build_all'."
  exit 1
fi

if [[ $1 == "containers" ]]; then
  # Stop and remove all running containers
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)
elif [[ $1 == "images" ]]; then
  # Remove all images
  docker rmi $(docker images -a -q)
elif [[ $1 == "delete_all" ]]; then
  # Stop and remove all running containers
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)

  # Remove all images
  docker rmi $(docker images -a -q)
elif [[ $1 == "build_all" ]]; then


  # build All
  echo "Build and run python app Docker image"
  echo "========================================"
  cd ../cs2-platform-engine || exit
  docker build -t engine .
  # docker run -d -p 8080:8080 engine
  docker run -d -it -v /Users/ahmed.soliman/workspace/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 engine:latest python main.py --model_weights model/model.ptw --arch_cd v1





  echo "Build and run React app Docker image"
  echo "========================================"
  cd ../cs2-platform || exit
  docker build -t frontend .
  docker run -d -it -p 3000:3000 frontend

  
  
  echo "Build and run Node.js app Docker image"
  echo "========================================"
  cd ../cs2-platform-backend || exit
  docker build -t backend .
  docker run -d -it -p 3001:3001 backend

elif [[ $1 == "build_only" ]]; then
  cd ../cs2-platform || exit
  docker build -t frontend .

  cd ../cs2-platform-backend || exit
  docker build -t backend .

  cd ../cs2-platform-engine || exit
  docker build -t engine .

elif [[ $1 == "front" ]]; then
  echo "Build and run React app Docker image"
  echo "========================================"
  cd ../cs2-platform || exit
  docker build -t frontend .
  docker run -d -it -p 3000:3000 frontend

  

elif [[ $1 == "back" ]]; then
  echo "Build and run React app Docker image"
  echo "========================================"
  cd ../cs2-platform-backend || exit
  docker build -t backend .
  docker run -d -it -p 3001:3001 backend



elif [[ $1 == "engine" ]]; then
  echo "Build and run Engine app Docker image"
  echo "========================================"
  cd ../cs2-platform-engine || exit
  docker build -t engine .
  # docker run -d -p 8080:8080 engine
  docker run -d -it -v /Users/ahmed.soliman/workspace/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 engine:latest python main.py --model_weights model/model.ptw --arch_cd v1

elif [[ $1 == "engine_2" ]]; then
  # echo "Build and run Engine_2 app Docker image"
  # echo "========================================"
  cd ../cs2-platform-engine || exit

  docker build -t engine .
  docker run -e model_weights="model/model.ptw" -e arch_cd="v1" -v /Users/ahmed.soliman/workspace/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 engine
  # docker run -d -it -v /Users/ahmed.soliman/workspace/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 engine:latest python main.py --model_weights model/model.ptw --arch_cd v1
#docker run -e User_Name="TutorialsPoint" -e Pass_Word="secret" --name env_cont env_img

else
  echo "Invalid argument. Please use 'containers', 'images', or 'all'."
  exit 1
fi




