import * as express from "express";
import {ResponseType} from "../../../../../../types/ResponseType";
import {ValidationErrorType} from "../../../../../../types/ValidationErrorType";

export interface RequestHandlerType {
  sendSuccessfulResponse: (res: express.Response, data: any) => void;
  sendUnauthorizedResponse: (res: express.Response) => void;
  sendBadRequestResponse: (
    res: express.Response,
    validations: ValidationErrorType[]
  ) => void;
  sendUnknownResponse: (res: express.Response, data: any) => void;
}

const RequestHandler = (): RequestHandlerType => ({
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

export default RequestHandler;
