$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff)
aws ecs update-service --cluster tripbff-prod --service tripbff-redis-service --force-new-deployment --profile tripbff