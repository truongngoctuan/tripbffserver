$(aws ecr get-login --no-include-email --region ap-southeast-1)
aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-info-lottie-web-service --force-new-deployment