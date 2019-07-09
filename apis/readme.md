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
docker build -t tripbff/sso .
docker tag tripbff/sso:latest 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest
docker push 883134154478.dkr.ecr.ap-southeast-1.amazonaws.com/tripbff/sso:latest

# Setup mongoDB
username/pass dev-mongodb-access u7NFj4hB2YkNjyF
connection string
`mongodb+srv://dev-mongodb-access:u7NFj4hB2YkNjyF@cluster0-uvltq.mongodb.net/test?retryWrites=true&w=majority`