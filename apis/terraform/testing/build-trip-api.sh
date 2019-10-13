docker tag tripbff/trip-api:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff-test)
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
# aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-trip-api-service --force-new-deployment