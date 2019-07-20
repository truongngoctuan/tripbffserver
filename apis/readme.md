start docker with redis instance

```
docker pull redis
docker run -p 7001:6379 --name some-redis3 redis
```

verify

```
node .\redis.js
```

setup sso server

```
yarn serve
```

Then `postman` this to this url `http://localhost:3000/login` with `email` & `password` under body `x-www-form-urlencoded`

use token return as Bearer to `http://localhost:8000/hello/55`

# Mongo

## setup docker

```bash
docker network create mnet
docker network inspect mnet

# attach `some-mongo` into mnet
docker run --name some-mongo --net mnet mongo -d
# test some-mongo
docker exec -it some-mongo bash
db.foo.find()
db.foo.save({a: 1})

# addtach `client-mongo` into mnet too
docker run --name client-mongo --net mnet mongo -d
# test client-mongo
docker exec -it client-mongo bash
mongo --host some-mongo
db.foo.find()
db.foo.save({a: 333})


# finish mongo container
docker stop client-mongo
docker rm client-mongo
docker stop some-mongo
docker rm some-mongo

# test mongo mounting
docker run --rm -v /data/db:/data alpine ls /data
```

```bash
docker-compose -f .\dockers\mongo\docker-compose.yml --verbose up
```


# How to configure aws credential

credential data
```
const AWS_ACCESS_KEY_ID = "AKIA43HXFY3XFFFG5GRX"
const AWS_SECRET_ACCESS_KEY = "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"
const S3_BUCKET = "tripbff-dev-trips"
const S3_REGION = "ap-southeast-1" //singapore
```

```bash
aws configure --profile tripbff
```

> remember to use `--profile tripbff`

refs:
* configure aws credential: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
* named profile: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

AWS_PROFILE=dog
echo $AWS_PROFILE

$(aws ecr get-login --no-include-email --region ap-southeast-1 --profile tripbff)
docker build -t tripbff/sso ./sso
docker tag tripbff/sso:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest

docker build -t tripbff/trip-api ./trip-api
docker tag tripbff/trip-api:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/trip-api:latest

docker build -t tripbff/infographic ./Infographic
docker tag tripbff/infographic:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/infographic:latest

docker build -t tripbff/lottie-web ./LottieWeb
docker tag tripbff/lottie-web:latest 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest
docker push 866404760327.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/lottie-web:latest

# Setup mongoDB
username/pass dev-mongodb-access u7NFj4hB2YkNjyF
connection string
`mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority`

# ECS & EC2
ssh into ec2 instance
ssh -i "tripbff-inte-kp.pem" ec2-user@ec2-18-139-115-172.ap-southeast-1.compute.amazonaws.com

current running instance
| name              | desc                                                    |
| ----------------- | ------------------------------------------------------- |
| Public DNS (IPv4) | ec2-18-139-115-172.ap-southeast-1.compute.amazonaws.com |
| IPv4 Public IP    | 18.139.115.172                                          |

## Auto deployment
aws ecs update-service --cluster tripbff-inte-cluster --service tripbff-trip-api-service --force-new-deployment
ecs-cli ps --cluster tripbff-inte-cluster

remember to config `service` to have minimum health == 0 so that it can stop the current service before deploy a new one
[reference](https://stackoverflow.com/a/48952145/3161505)
## Current infrastructure:
cluster: tripbff-inte-cluster
services:
* tripbff-sso-service
* tripbff-trip-api-service
* tripbff-info-lottie-web-service
* tripbff-redis-service
tasks:


# Redis

Cannot know which ec2 expose port due to elastic EC2 scaling
```bash
redis-cli -h 18.139.115.172 ping
redis-cli -h ec2-18-139-115-172.ap-southeast-1.compute.amazonaws.com ping
```

Solutions:
* hard-coded into env of task
* study route53 to add A record -> fixed hosted namespace that convert to a EC2 public IP
  * if this record can be change elastically
* What happens if there are multiple EC2 instances, how would route53 behave ?