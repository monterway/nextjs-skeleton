import * as express from "express";
import RequestHandler from "../../modules/RequestHandler/RequestHandler";
import {GetDataRequestType} from "../../../../../../types/GetDataRequestType";
import * as admin from "firebase-admin";
import {DocType} from "../../../../../../types/DocType";
import {GetDataResponseType} from "../../../../../../types/GetDataResponseType";

const Data = express.Router();

Data.all("/get-data", (req, res) => {
  const requestData = req.body.data as GetDataRequestType;

  if (typeof requestData !== "object") {
    RequestHandler().sendBadRequestResponse(res, [
      {
        field: "requestData",
        error: "invalid",
      },
    ]);
    return;
  }

  if (!("dataRequests" in requestData)) {
    RequestHandler().sendBadRequestResponse(res, [
      {
        field: "dataRequests",
        error: "missing",
      },
    ]);
    return;
  }

  if (!Array.isArray(requestData.dataRequests)) {
    RequestHandler().sendBadRequestResponse(res, [
      {
        field: "dataRequests",
        error: "invalid",
      },
    ]);
    return;
  }

  if (
    requestData.dataRequests.some(
      (dataRequest) =>
        typeof dataRequest !== "object" ||
        !("id" in dataRequest) ||
        typeof dataRequest.id !== "string" ||
        !("entity" in dataRequest) ||
        typeof dataRequest.entity !== "string" ||
        ("where" in dataRequest && !Array.isArray(dataRequest.where)) ||
        ("where" in dataRequest &&
          Array.isArray(dataRequest.where) &&
          dataRequest.where.some(
            (whereClause) =>
              typeof whereClause !== "object" ||
              !("property" in whereClause) ||
              typeof whereClause.property !== "string" ||
              !("type" in whereClause) ||
              typeof whereClause.type !== "string" ||
              !("value" in whereClause) ||
              !["string", "number", "boolean"].includes(
                typeof whereClause.value
              )
          ))
    )
  ) {
    RequestHandler().sendBadRequestResponse(res, [
      {
        field: "dataRequests",
        error: "invalid",
      },
    ]);
    return;
  }

  const promises: Promise<DocType[]>[] = requestData.dataRequests.map(
    (dataRequest) => {
      let docsRef:
        | admin.firestore.CollectionReference<admin.firestore.DocumentData>
        | admin.firestore.Query<admin.firestore.DocumentData> = admin
        .firestore()
        .collection(dataRequest.entity);
      if ("where" in dataRequest && Array.isArray(dataRequest.where)) {
        dataRequest.where.forEach((whereClause) => {
          if (whereClause.type === "==") {
            docsRef = docsRef.where(
              whereClause.property,
              whereClause.type,
              whereClause.value
            );
          }
        });
      }
      return new Promise((resolve) => {
        docsRef
          .get()
          .then((docsSnapshot) => {
            resolve(
              docsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                uid: doc.id,
              }))
            );
          })
          .catch(() => {
            resolve([]);
          });
      });
    }
  );

  Promise.all(promises).then((docs) => {
    const responseData: GetDataResponseType = requestData.dataRequests.reduce(
      (responseData, dataRequest, dataRequestIndex) =>
        Object.assign(responseData, {
          [dataRequest.id]: docs[dataRequestIndex]
            ? docs[dataRequestIndex]
            : [],
        }),
      {}
    );
    RequestHandler().sendSuccessfulResponse(res, responseData);
    return;
  });
});

export default Data;
