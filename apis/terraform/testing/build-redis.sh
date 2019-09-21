docker tag tripbff/redis:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff-test)
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
# aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-redis-service --force-new-deployment