const config = {
  auth: {
    TTLInSeconds: 3600,
    keyPrefix: "login-session"
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "db"
  }
};

module.exports = config;
