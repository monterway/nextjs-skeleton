import * as express from 'express';
import * as admin from 'firebase-admin';

export interface AuthType {
  setUserInRequest: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
}

const Auth = (): AuthType => ({
  setUserInRequest: async (req, res, next) => {
    let idToken: string | null = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies && req.cookies.__session) {
      idToken = req.cookies.__session;
    }

    if (idToken !== null) {
      try {
        const user = await admin.auth().verifyIdToken(idToken);
        if (user.email) {
          req.user = {
            email: user.email
          };
        } else {
          req.user = null;
        }
      } catch (e) {
        next();
        return;
      }
    } else {
      req.user = null;
    }

    next();
    return;
  }
});

export default Auth;
