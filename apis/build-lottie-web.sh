docker build -t tripbff/lottie-web ./LottieWeb
docker tag tripbff/lottie-web:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest
$(aws ecr get-login --no-include-email --region ap-southeast-1)
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest