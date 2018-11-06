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