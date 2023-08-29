import React from 'react';
import { GetDataResponseType } from '../../../../general/types/GetDataResponseType';

const DataContext = React.createContext<GetDataResponseType>({});

export default DataContext;
