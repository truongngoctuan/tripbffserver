###############################################################################
# Step 1 : Builder image
#
FROM node:9-alpine AS builder

# Define working directory and copy source
WORKDIR /home/node/app
COPY . .
# Install dependencies and build whatever you have to build 
# (babel, grunt, webpack, etc.)
RUN npm install && npm run build

###############################################################################
# Step 2 : Run image
#
FROM node:9-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
COPY ./package* ./
RUN npm install && \
    npm cache clean --force
# Copy builded source from the upper builder stage
COPY --from=builder /home/node/app/dist ./dist

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 80

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && npm start

# # Start the app
# CMD npm start