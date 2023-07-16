import { ResponseType } from '../../../../types/ResponseType';

export class HttpError extends Error {
  response: ResponseType;

  constructor(response: ResponseType) {
    super(response.status);
    this.response = response;
  }
}
