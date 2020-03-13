AWS_PROFILE=tripbff
STAGE=prod

$(aws ecr get-login-password --region ap-southeast-1 --profile $AWS_PROFILE)
aws ecs update-service --cluster tripbff-$STAGE --service tripbff-trip-api-service --force-new-deployment --profile $AWS_PROFILE
aws ecs update-service --cluster tripbff-$STAGE --service tripbff-infographic-service --force-new-deployment --profile $AWS_PROFILE