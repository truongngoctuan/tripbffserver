const config = {
    app: {
      port: 3000
    },
    redisStore: {
        url: "locahost",
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