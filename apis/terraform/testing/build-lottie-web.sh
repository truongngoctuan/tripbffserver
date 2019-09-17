docker tag tripbff/lottie-web:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff-test)
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest
# aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-lottie-web-service --force-new-deployment