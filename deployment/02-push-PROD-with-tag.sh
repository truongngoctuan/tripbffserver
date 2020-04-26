AWS_PROFILE=tripbff
VERSION=1.1.2

docker tag tripbff/redis:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
docker tag tripbff/sso:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:$VERSION
docker tag tripbff/trip-api:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:$VERSION
docker tag tripbff/infographic:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:$VERSION

AWS_PROFILE=tripbff docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
AWS_PROFILE=tripbff docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:$VERSION
AWS_PROFILE=tripbff docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:$VERSION
AWS_PROFILE=tripbff docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:$VERSION
