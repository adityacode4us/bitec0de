var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { APP_PORT } from "./config/index.js";
import { sequelConnection, testDbConnection } from "./database/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
import Contacts from "./models/Contacts.js";
const app = express();
//Application Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var whitelist = [
    "http://localhost:3000",
    "https://your-app-name.railway.app",
    "https://your-app-name.onrender.com",
];
// const corsOptions: cors.CorsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow: boolean) => void
//   ) => {
//     if (!origin || whitelist.includes(origin as string)) {
//       callback(null, true); // Allow the request
//     } else {
//       callback(new Error("Not allowed by CORS"), false); // Deny the request
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
// app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use("", routes);
// Error middleware when from routes redirected to this this middleware on next function
app.use(errorHandler);
const dbTestingAndConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield testDbConnection();
    try {
        yield sequelConnection.sync({ alter: true });
        yield Contacts.sync({ alter: true });
        console.log("database synced successfully");
    }
    catch (error) {
        console.log(error);
    }
});
dbTestingAndConnection();
const PORT = process.env.PORT || APP_PORT || 3000;
const httpServer = app.listen(PORT, () => {
    console.log(`Our bitecode server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map