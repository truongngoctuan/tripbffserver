$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff-test)
aws ecs update-service --cluster tripbff-preinte --service tripbff-trip-api-service --force-new-deployment --profile tripbff-test