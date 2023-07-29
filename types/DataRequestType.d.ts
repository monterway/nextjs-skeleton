import { DataRequestWhereType } from "./DataRequestWhereType";

export interface DataRequestType {
  id: string;
  entity: string;
  where?: DataRequestWhereType[];
}
