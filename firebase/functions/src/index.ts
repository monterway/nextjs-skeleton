import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import AuthModule from './core/modules/Auth/Auth';
import AuthRoutes from './core/routes/Auth/Auth';
import ApiRoutes from './api/routes/Api/Api';

admin.initializeApp();

let app = express();
const appCors = cors({ origin: true });
const appCookieParser = cookieParser();

app.use(appCors);
app.use(appCookieParser);
app.use(AuthModule().setUserInRequest);

app.use('/auth', AuthRoutes);
app.use('/api', ApiRoutes);

exports.app = functions.https.onRequest(app);
