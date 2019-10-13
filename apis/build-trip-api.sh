docker build -t tripbff/trip-api ./trip-api
docker tag tripbff/trip-api:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest