import dotenv from "dotenv";
dotenv.config();
const dbCredentials = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "Aditya@018#",
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || "",
    DB: process.env.DB_NAME || "personal-chat",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
export default dbCredentials;
//# sourceMappingURL=dbConfig.js.map