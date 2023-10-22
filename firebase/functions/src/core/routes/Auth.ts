import * as express from "express";
import {UserType} from "../../../../../general/types/UserType";
import ResponseHandler from "../modules/ResponseHandler/ResponseHandler";

const Auth = express.Router();

Auth.all("/me", (req, res) => {
  let user: UserType | null = null;

  if (req.user && req.user.email) {
    user = {
      email: req.user.email,
    };
  }

  ResponseHandler().sendSuccessfulResponse(res, user);
  return;
});

export default Auth;
