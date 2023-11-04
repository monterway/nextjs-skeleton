import * as admin from "firebase-admin";
import * as express from "express";
import * as functions from "firebase-functions";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import RequestHandler from "./core/modules/RequestHandler/RequestHandler";
import AuthModule from "./core/modules/Auth/Auth";
import AuthRoutes from "./core/routes/Auth";
import DataRoutes from "./core/routes/Data";
import QuestionRoutes from "./core/routes/Question";
import QuestionTriggers from "./core/triggers/Question";
import AppRoutes from "./app/routes/App";
import AppTriggers from "./app/triggers/App";

admin.initializeApp();

const app = express();
const appCors = cors({origin: true});
const appCookieParser = cookieParser();

app.use(appCors);
app.use(appCookieParser);
app.use(RequestHandler().handleRequest);
app.use(AuthModule().setUserInRequest);

app.use("/auth", AuthRoutes);
app.use("/data", DataRoutes);
app.use("/question", QuestionRoutes);
app.use("/app", AppRoutes);

exports.app = functions.region("europe-west3").https.onRequest(app);

const triggers: functions.CloudFunction<admin.firestore.QueryDocumentSnapshot>[] =
  [...QuestionTriggers, ...AppTriggers];

triggers.forEach((trigger, index) => {
  exports[`trigger${index}`] = trigger;
});
