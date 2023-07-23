import * as express from "express";
import {UserType} from "../../../../../../types/UserType";
import RequestHandler from "../../modules/RequestHandler/RequestHandler";

const Auth = express.Router();

Auth.all("/me", (req, res) => {
  let user: UserType | null = null;

  if (req.user && req.user.email) {
    user = {
      email: req.user.email,
    };
  }

  RequestHandler().sendSuccessfulResponse(res, user);
  return;
});

export default Auth;
