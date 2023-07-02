import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { UserType } from '../../../types/UserType';

admin.initializeApp();

const api = express();
const apiCors = cors({ origin: true });
const apiCookieParser = cookieParser();
const auth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let idToken: string | null = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies && req.cookies.__session) {
    idToken = req.cookies.__session;
  }

  if (idToken !== null) {
    try {
      req.user = await admin.auth().verifyIdToken(idToken);
    } catch (e) {
      next();
      return;
    }
  } else {
    req.user = null;
  }

  next();
  return;
};

api.use(apiCors);
api.use(apiCookieParser);
api.use(auth);

api.post('/me', (req, res) => {
  let user: UserType | null = null;

  if (req.user && req.user.email) {
    user = {
      email: req.user.email
    };
  }

  res.send(
    JSON.stringify({
      data: user
    })
  );
});

exports.api = functions.https.onRequest(api);
