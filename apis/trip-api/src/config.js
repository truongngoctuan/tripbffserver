const config = {
  // app: {
  //   port: 3000
  // },
  // auth: {
  //   TTLInSeconds: 3600,
  //   keyPrefix: "login-session",
  // },
  redisStore: {
    host: "127.0.1.1",
    port: 6379,
  },
  mongo: {
    host: '127.0.1.1',
    port: '27017',
  }
  // db: {
  //   host: 'localhost',
  //   port: 27017,
  //   name: 'db'
  // }
};

module.exports = config;