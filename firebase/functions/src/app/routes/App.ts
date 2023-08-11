import * as express from "express";
import RequestHandler from "../../core/modules/RequestHandler/RequestHandler";
import {TestRequestType} from "../../../../../types/Custom";
import Validator from "../../core/modules/Validator/Validator";

const App = express.Router();

App.all("/test", (req, res) => {
  if (!req.user) {
    RequestHandler().sendUnauthorizedResponse(res);
    return;
  }

  const requestData: TestRequestType = req.body.data;

  const requestDataValidator = Validator({
    definition: {
      test: {
        type: String,
        required: true,
      },
    },
  });

  const validations = requestDataValidator.validate(requestData);

  if (validations.length) {
    RequestHandler().sendBadRequestResponse(res, validations);
    return;
  }

  RequestHandler().sendSuccessfulResponse(res, {
    test: requestData.test,
  });
  return;
});

export default App;
