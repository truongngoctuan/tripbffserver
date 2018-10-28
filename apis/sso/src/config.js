const config = {
    app: {
      port: 3000
    },
    auth: {
      TTLInSeconds: 3600,
      keyPrefix: "login-session",
    },
    redisStore: {
        host: "localhost",
        port: 7001,
        secret: "asd",
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'db'
    }
   };
   
   module.exports = config;