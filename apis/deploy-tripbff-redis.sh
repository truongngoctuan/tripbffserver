$(aws ecr get-login --no-include-email --region ap-southeast-1)
aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-sso-service --force-new-deployment`