docker tag tripbff/sso:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff-test)
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
# aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-sso-service --force-new-deployment