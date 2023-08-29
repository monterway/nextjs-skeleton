import * as express from "express";
import ResponseHandler from "../../core/modules/ResponseHandler/ResponseHandler";
import {
  TestRequestType,
  TestResponseType,
} from "../../../../../general/types/Custom";
import Validator from "../../core/modules/Validator/Validator";

const App = express.Router();

App.all("/test", (req, res) => {
  if (!req.user) {
    ResponseHandler().sendUnauthorizedResponse(res);
    return;
  }

  const requestData: TestRequestType = req.body.data;

  const requestDataValidator = Validator({
    definition: {
      test: {
        required: true,
        type: String,
      },
    },
    translator: req.translator,
  });

  const validations = requestDataValidator.validate(requestData);

  if (validations.length) {
    ResponseHandler().sendBadRequestResponse(res, validations);
    return;
  }

  const responseData: TestResponseType = requestData;

  ResponseHandler().sendSuccessfulResponse(res, responseData);
  return;
});

export default App;
