import * as express from 'express';
import { ResponseType } from '../../../../../../types/ResponseType';
import { ValidationType } from '../../../../../../types/ValidationType';

export interface RequestHandlerType {
  sendSuccessfulResponse: (res: express.Response, data: any) => void;
  sendUnauthorizedResponse: (res: express.Response) => void;
  sendUnprocessableEntityResponse: (res: express.Response, validations: ValidationType[]) => void;
}

const RequestHandler = (): RequestHandlerType => ({
  sendSuccessfulResponse: (res, data) => {
    const response: ResponseType = {
      status: 'OK',
      data
    };
    res.send({
      data: response
    });
  },
  sendUnauthorizedResponse: (res) => {
    const response: ResponseType = {
      status: 'UNAUTHORIZED'
    };
    res.send({
      data: response
    });
  },
  sendUnprocessableEntityResponse: (res, validations) => {
    const response: ResponseType = {
      status: 'VALIDATION',
      data: validations
    };
    res.send({
      data: response
    });
  }
});

export default RequestHandler;
