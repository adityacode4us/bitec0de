import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";

// const sequelConnection = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,
//   {
//     host: dbConfig.HOST,
//     dialect: "postgres",
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle,
//     },
//   }
// );

console.log("dbConfig.DB_CONNECTION_STRING", dbConfig.DB_CONNECTION_STRING);

const sequelConnection = new Sequelize(dbConfig.DB_CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const testDbConnection = async () => {
  try {
    await sequelConnection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelConnection, testDbConnection, DataTypes };
