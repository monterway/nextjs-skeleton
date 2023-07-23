import * as express from "express";
import RequestHandler from "../../core/modules/RequestHandler/RequestHandler";
import {ValidationType} from "../../../../../types/ValidationType";

const App = express.Router();

App.all("/test", (req, res) => {
  if (!req.user) {
    RequestHandler().sendUnauthorizedResponse(res);
    return;
  }

  const data = req.body.data;
  const validations: ValidationType[] = [];

  if (!("test" in data)) {
    validations.push({
      field: "test",
      error: "missing",
    });
  }

  if (validations.length) {
    RequestHandler().sendBadRequestResponse(res, validations);
    return;
  }

  RequestHandler().sendSuccessfulResponse(res, {
    test: data.test,
  });
  return;
});

export default App;
