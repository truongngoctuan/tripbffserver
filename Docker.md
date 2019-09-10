to-do
* Dockerfile for soo
  * Link to `redis`
  * Link to `mongo-db`
* Dockerfile for trip-api
  * Link to `redis`
  * Link to `mongo-db`
* Dockerfile for Infographic
  * Link to `redis`
* 

```
docker network create mnet

docker build -t tripbff/sso .
docker run -d -p 3000:3000 tripbff/sso
```

to access mongo-express http://localhost:9091/


```bash
docker stop $(docker container ls | grep "tripbff-" | cut -d ' ' -f1)
docker run -it tripbff/trip-api sh
du -sh node_modules/* | sort -hr
```

```bash
docker build -t friendlyhello .  # Create image using this directory's Dockerfile
docker run -p 4000:80 friendlyhello  # Run "friendlyhello" mapping port 4000 to 80
docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode
docker container ls                                # List all running containers
docker container ls -a             # List all containers, even those not running
docker container stop <hash>           # Gracefully stop the specified container
docker container kill <hash>         # Force shutdown of the specified container
docker container rm <hash>        # Remove specified container from this machine
docker container rm $(docker container ls -a -q)         # Remove all containers
docker image ls -a                             # List all images on this machine
docker image rm <image id>            # Remove specified image from this machine
docker image rm $(docker image ls -a -q)   # Remove all images from this machine
docker login             # Log in this CLI session using your Docker credentials
docker tag <image> username/repository:tag  # Tag <image> for upload to registry
docker push username/repository:tag            # Upload tagged image to registry
docker run username/repository:tag                   # Run image from a registry
# Enter the container
$ docker exec -it <container id> /bin/bash
```

wait for db service to up and running 
https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b

for total size
du -sh *
short version of:

du --summary --human-readable *

