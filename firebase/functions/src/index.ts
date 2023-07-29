import * as admin from "firebase-admin";
import * as express from "express";
import * as functions from "firebase-functions";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import AuthModule from "./core/modules/Auth/Auth";
import AuthRoutes from "./core/routes/Auth/Auth";
import DataRoutes from "./core/routes/Data/Data";
import AppRoutes from "./app/routes/App";

admin.initializeApp();

const app = express();
const appCors = cors({origin: true});
const appCookieParser = cookieParser();

app.use(appCors);
app.use(appCookieParser);
app.use(AuthModule().setUserInRequest);

app.use("/auth", AuthRoutes);
app.use("/data", DataRoutes);
app.use("/app", AppRoutes);

exports.app = functions.region("europe-west3").https.onRequest(app);
