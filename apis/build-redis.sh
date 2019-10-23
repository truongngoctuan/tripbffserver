docker build -t tripbff/redis ./redis
docker tag tripbff/redis:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff)
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/redis:latest