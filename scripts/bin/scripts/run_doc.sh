#!/bin/bash

# docker build -t fastapi .

# docker run --rm -it -p 8080:8080 fastapi:latest python main.py --model_weights ../model.ptw --arch_cd v1

docker run --rm -it -v /Users/ahmed.soliman/workspace/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 image:latest python main.py --model_weights model/model.ptw --arch_cd v1
# docker run --rm -it -v /home/ahmed.soliman@Avrcorp.net/cs2/cs2-platform-engine/model:/app/model -p 8080:8080 fastapi:latest python main.py --model_weights model/model.ptw --arch_cd v1

