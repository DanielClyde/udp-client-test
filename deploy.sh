#!/bin/bash
echo "Building for production..." &&
docker buildx build -f Dockerfile --platform=linux/amd64 -t udp-client-prod --target prod . &&
echo "Publishing to ECR" &&
aws --profile ncss-danny ecr get-login-password --region us-east-1 | \
 docker login --username AWS --password-stdin 839833192911.dkr.ecr.us-east-1.amazonaws.com && \
 docker tag udp-client-prod:latest 839833192911.dkr.ecr.us-east-1.amazonaws.com/udp-client:latest && \
 docker push 839833192911.dkr.ecr.us-east-1.amazonaws.com/udp-client:latest
# echo "Creating Service Deployment" &&
# aws --profile ncss-danny --region us-east-1 ecs update-service --cluster udp-server --service udp-server --force-new-deployment
