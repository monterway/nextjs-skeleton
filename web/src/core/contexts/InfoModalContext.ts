import React, { Dispatch, SetStateAction } from 'react';
import { InfoModalType } from '../types/InfoModalType';

export interface InfoModalContextType {
  set: Dispatch<SetStateAction<InfoModalType | null>>;
  get: InfoModalType | null;
}

const InfoModalContext = React.createContext<InfoModalContextType>({
  set: () => {},
  get: null
});

export default InfoModalContext;
