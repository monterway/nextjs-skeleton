import React from 'react';
import { GetDataResponseType } from '../../../../types/GetDataResponseType';

const DataContext = React.createContext<GetDataResponseType>({});

export default DataContext;
