const dbCredentials = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Aditya@018#",
  DB: "personal-chat",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbCredentials;
