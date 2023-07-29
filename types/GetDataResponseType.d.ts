import { DocType } from "./DocType";

export interface GetDataResponseType {
  [dataRequestId: string]: DocType[];
}
