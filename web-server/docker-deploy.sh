#!/usr/bin/env bash

docker pull 5tigerjelly/tmohack;
docker rm -f tmo-server;

docker run -d \
-p 80:3000 \
--name tmo-server \
5tigerjelly/tmohack;
