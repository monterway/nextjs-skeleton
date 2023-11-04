import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";
import MailingConfig from "../../app/config/MailingConfig";
import {QuestionType} from "../../../../../general/types/QuestionType";

const transporter = nodemailer.createTransport(MailingConfig);

const Question: functions.CloudFunction<admin.firestore.QueryDocumentSnapshot>[] =
  [];

Question.push(
  functions.firestore
    .document("questions/{docUid}")
    .onCreate(async (change) => {
      const questionUid = change.id;
      const question = change.data() as QuestionType;
      await transporter.sendMail({
        from: `"${MailingConfig.fromName}" <${MailingConfig.fromEmail}>`,
        to: [MailingConfig.fromEmail].join(", "),
        subject: `New question received (#${questionUid})`,
        text: `
        First name: ${question.firstName}; 
        Last name: ${question.lastName}; 
        Email: ${question.email}; 
        Message: ${question.message};
      `,
        html: `
        <br>
        <b>First name</b>: ${question.firstName}
        <br> 
        <b>Last name</b>: ${question.lastName}
        <br> 
        <b>Email</b>: ${question.email}
        <br> 
        <b>Message</b>: ${question.message}
        <br>
      `,
      });
    })
);

export default Question;
