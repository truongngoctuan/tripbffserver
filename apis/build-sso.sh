docker build -t tripbff/sso ./sso
docker tag tripbff/sso:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff)
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest