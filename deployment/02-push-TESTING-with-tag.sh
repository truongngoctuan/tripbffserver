AWS_PROFILE=tripbff-test
VERSION=1.1.0

docker tag tripbff/redis:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
docker tag tripbff/sso:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:$VERSION
docker tag tripbff/trip-api:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:$VERSION
docker tag tripbff/infographic:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:$VERSION

docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:$VERSION
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:$VERSION
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:$VERSION
