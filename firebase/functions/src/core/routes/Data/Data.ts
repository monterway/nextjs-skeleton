import * as express from "express";
import ResponseHandler from "../../modules/ResponseHandler/ResponseHandler";
import {GetDataRequestType} from "../../../../../../general/types/GetDataRequestType";
import * as admin from "firebase-admin";
import {DocType} from "../../../../../../general/types/DocType";
import {GetDataResponseType} from "../../../../../../general/types/GetDataResponseType";

const Data = express.Router();

Data.all("/get-data", (req, res) => {
  const requestData = req.body.data as GetDataRequestType;

  if (typeof requestData !== "object") {
    ResponseHandler().sendBadRequestResponse(res, [
      {
        field: "requestData",
        error: "invalid",
      },
    ]);
    return;
  }

  if (!("dataRequests" in requestData)) {
    ResponseHandler().sendBadRequestResponse(res, [
      {
        field: "dataRequests",
        error: "missing",
      },
    ]);
    return;
  }

  if (!Array.isArray(requestData.dataRequests)) {
    ResponseHandler().sendBadRequestResponse(res, [
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
          )) ||
        ("uid" in dataRequest && typeof dataRequest.uid !== "string") ||
        (!("uid" in dataRequest) && !("where" in dataRequest))
    )
  ) {
    ResponseHandler().sendBadRequestResponse(res, [
      {
        field: "dataRequests",
        error: "invalid",
      },
    ]);
    return;
  }

  const promises: Promise<DocType[]>[] = requestData.dataRequests.map(
    (dataRequest) => {
      if ("where" in dataRequest && Array.isArray(dataRequest.where)) {
        let docsRef = admin
          .firestore()
          .collection(
            dataRequest.entity
          ) as admin.firestore.Query<admin.firestore.DocumentData>;
        dataRequest.where.forEach((whereClause) => {
          if (whereClause.type === "==") {
            docsRef = docsRef.where(
              whereClause.property,
              whereClause.type,
              whereClause.value
            );
          }
        });
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
      } else if ("uid" in dataRequest && typeof dataRequest.uid === "string") {
        const docRef = admin
          .firestore()
          .collection(dataRequest.entity)
          .doc(
            dataRequest.uid
          ) as admin.firestore.DocumentReference<admin.firestore.DocumentData>;
        return new Promise((resolve) => {
          docRef
            .get()
            .then((docSnapshot) => {
              if (docSnapshot.exists) {
                resolve([
                  {
                    ...docSnapshot.data(),
                    uid: docSnapshot.id,
                  },
                ]);
              }
            })
            .catch(() => {
              resolve([]);
            });
        });
      } else {
        return new Promise((resolve) => {
          resolve([]);
        });
      }
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
    ResponseHandler().sendSuccessfulResponse(res, responseData);
    return;
  });
});

export default Data;
