AWS_PROFILE=tripbff-test

docker tag tripbff/redis:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
docker tag tripbff/sso:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
docker tag tripbff/trip-api:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
docker tag tripbff/infographic:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest

docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest
