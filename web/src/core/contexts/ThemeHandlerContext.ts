import React, { Dispatch, SetStateAction } from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeHandlerType {
  set: Dispatch<SetStateAction<ThemeType>>;
  get: ThemeType;
}

const ThemeHandlerContext = React.createContext<ThemeHandlerType>({
  set: () => 'light',
  get: 'light'
});

export default ThemeHandlerContext;
