# ###############################################################################
# # Step 1 : Builder image
# #
# FROM node:8.12-alpine AS builder
# # FROM mhart/alpine-node:10.16 AS builder

# # Define working directory and copy source
# WORKDIR /home/node/app

# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile; \
#   yarn cache clean;

# # Define working directory and copy source
# WORKDIR /home/node/app
# COPY . .
# # Install dependencies and build whatever you have to build 
# # (babel, grunt, webpack, etc.)
# RUN yarn build && yarn --production

###############################################################################
# Step 2 : Run image
#
FROM node:10.16.0-alpine
# https://stackoverflow.com/questions/57088230/node-canvas-on-alpine-within-docker
#  add libraries; sudo so non-root user added downstream can get sudo
RUN apk add --no-cache \
  sudo \
  curl \
  build-base \
  g++ \
  libpng \
  libpng-dev \
  jpeg-dev \
  pango-dev \
  cairo-dev \
  giflib-dev \
  python \
  ;

#  add glibc and install canvas
RUN apk --no-cache add ca-certificates wget  && \
  wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
  wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
  apk add glibc-2.29-r0.apk && \
  npm install canvas@2.5.0
  
ENV NODE_ENV=production

WORKDIR /home/node/app

# Install deps for production only
COPY ./package* yarn.lock ./
RUN yarn install  --frozen-lockfile --production; \
  yarn cache clean;

# Copy builded source from the upper builder stage
# COPY --from=builder /home/node/app/dist ./dist
COPY . .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 8000

# Start the app
# CMD /wait && yarn start
CMD yarn serve:production