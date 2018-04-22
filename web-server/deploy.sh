#!/usr/bin/env bash
docker build -t 5tigerjelly/tmohack .
docker image prune -f

echo "Pushing container to Docker Hub"
docker push 5tigerjelly/tmohack
echo "ssh into VM and deploy container"
ssh -oStrictHostKeyChecking=no root@206.189.71.244 < docker-deploy.sh
echo "Completed Deployment! Here is a pizza 🍕"