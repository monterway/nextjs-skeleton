import React from 'react';
import { ModalType } from '../types/ModalType';

export interface ModalContextType {
  value: ModalType | null;
  set: React.Dispatch<React.SetStateAction<ModalType | null>>;
}

const ModalContext = React.createContext<ModalContextType>({
  value: null,
  set: () => null
});

export default ModalContext;
