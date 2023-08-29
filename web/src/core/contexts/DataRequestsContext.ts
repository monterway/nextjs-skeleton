import React, { Dispatch, SetStateAction } from 'react';
import { DataRequestType } from '../../../../general/types/DataRequestType';

export interface DataRequestsContextType {
  set: Dispatch<SetStateAction<DataRequestType[]>>;
  get: DataRequestType[];
}

const DataRequestsContext = React.createContext<DataRequestsContextType>({
  set: () => {},
  get: []
});

export default DataRequestsContext;
