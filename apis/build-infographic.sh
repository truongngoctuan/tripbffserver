docker build -t tripbff/infographic ./infographic2
docker tag tripbff/infographic:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest