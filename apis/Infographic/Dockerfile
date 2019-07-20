###############################################################################
# Step 2 : Run image
#
FROM buildkite/puppeteer
ENV NODE_ENV=production
WORKDIR /home/node/app

# Install deps for production only
COPY ./package* yarn.lock ./
RUN yarn install  --frozen-lockfile --production; \
  yarn cache clean;

COPY . .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 8000

# Start the app
# CMD /wait && yarn start
CMD yarn serve:production