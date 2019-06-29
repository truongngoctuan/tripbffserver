###############################################################################
# Step 1 : Builder image
#
FROM node:10.16-alpine AS builder
# FROM mhart/alpine-node:10.16 AS builder

# Define working directory and copy source
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile; \
  yarn cache clean;

# Define working directory and copy source
WORKDIR /home/node/app
COPY . .
# Install dependencies and build whatever you have to build 
# (babel, grunt, webpack, etc.)
RUN yarn build && yarn --production

###############################################################################
# Step 2 : Run image
#
FROM node:10.16-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
COPY ./package*  yarn.lock ./
RUN yarn install  --frozen-lockfile --production; \
  yarn cache clean;
# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app/dist ./dist

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 8000

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Start the app
CMD /wait && yarn start