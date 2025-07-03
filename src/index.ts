import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { APP_PORT } from "./config/index.js";
import { sequelConnection, testDbConnection } from "./database/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

import cors from "cors";
import Contacts from "./models/Contacts.js";

const app = express();

//Application Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

var whitelist = ["http://localhost:3000"];
const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin as string)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"), false); // Deny the request
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api", routes);

// Error middleware when from routes redirected to this this middleware on next function
app.use(errorHandler);

const dbTestingAndConnection = async () => {
  await testDbConnection();
  try {
    await sequelConnection.sync({ alter: true });
    await Contacts.sync({ alter: true });
    console.log("database synced successfully");
  } catch (error) {
    console.log(error);
  }
};
dbTestingAndConnection();

const httpServer = app.listen(APP_PORT, () => {
  console.log(`Our chat app is running on port ${APP_PORT}`);
});
