import * as express from "express";
import Translator from "../Translator/Translator";
import * as translations from "../../../../../../translations.json";

export interface RequestHandlerType {
  handleRequest: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => Promise<void>;
}

const RequestHandler = (): RequestHandlerType => ({
  handleRequest: async (req, res, next) => {
    const request = req.body.data;
    req.body.data = request.data;

    const locale = request.locale ? request.locale : "en";
    req.translator = Translator({
      locale,
      translations,
    });

    next();
    return;
  },
});

export default RequestHandler;
