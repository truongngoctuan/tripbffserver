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
yarn start
```

Then postman this to this url `http://localhost:3000/login` with `email` & `password` under body `x-www-form-urlencoded`