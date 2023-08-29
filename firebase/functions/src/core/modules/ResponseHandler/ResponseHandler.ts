import * as express from "express";
import {ResponseType} from "../../../../../../general/types/ResponseType";
import {ValidationErrorType} from "../../../../../../general/types/ValidationErrorType";

export interface ResponseHandlerType {
  sendSuccessfulResponse: (res: express.Response, data: any) => void;
  sendUnauthorizedResponse: (res: express.Response) => void;
  sendBadRequestResponse: (
    res: express.Response,
    validations: ValidationErrorType[]
  ) => void;
  sendUnknownResponse: (res: express.Response, data: any) => void;
}

const ResponseHandler = (): ResponseHandlerType => ({
  sendSuccessfulResponse: (res, data) => {
    const response: ResponseType = {
      status: "OK",
      data,
    };
    res.send({
      data: response,
    });
  },
  sendUnauthorizedResponse: (res) => {
    const response: ResponseType = {
      status: "UNAUTHORIZED",
    };
    res.send({
      data: response,
    });
  },
  sendBadRequestResponse: (res, validations) => {
    const response: ResponseType = {
      status: "BAD_REQUEST",
      data: validations,
    };
    res.send({
      data: response,
    });
  },
  sendUnknownResponse: (res, data) => {
    const response: ResponseType = {
      status: "UNKNOWN",
      data,
    };
    res.send({
      data: response,
    });
  },
});

export default ResponseHandler;
