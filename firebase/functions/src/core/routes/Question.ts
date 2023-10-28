import * as express from "express";
// eslint-disable-next-line max-len
import {QuestionCreateRequestType} from "../../../../../general/types/QuestionCreateRequestType";
// eslint-disable-next-line max-len
import {QuestionCreateResponseType} from "../../../../../general/types/QuestionCreateResponseType";
import Validator from "../../core/modules/Validator/Validator";
import ResponseHandler from "../../core/modules/ResponseHandler/ResponseHandler";
import * as admin from "firebase-admin";
import {FirebaseFirestoreError} from "firebase-admin/lib/utils/error";

const Question = express.Router();

Question.all("/create", (req, res) => {
  const requestData: QuestionCreateRequestType = req.body.data;

  const requestDataValidator = Validator({
    definition: {
      question: {
        required: true,
        properties: {
          firstName: {
            required: true,
            type: String,
          },
          lastName: {
            required: true,
            type: String,
          },
          email: {
            required: true,
            type: String,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          },
          message: {
            required: true,
            type: String,
          },
        },
      },
    },
    translator: req.translator,
  });

  const validations = requestDataValidator.validate(requestData);

  if (validations.length) {
    ResponseHandler().sendBadRequestResponse(res, validations);
    return;
  }

  const question = requestData.question;

  const questionRef = admin.firestore().collection("questions").doc();
  questionRef
    .set(question)
    .then(() => {
      const responseData: QuestionCreateResponseType = {
        questionDoc: {
          ...question,
          uid: questionRef.id,
        },
      };
      ResponseHandler().sendSuccessfulResponse(res, responseData);
      return;
    })
    .catch((error: FirebaseFirestoreError) => {
      ResponseHandler().sendUnknownResponse(res, error.code);
      return;
    });
});

export default Question;
