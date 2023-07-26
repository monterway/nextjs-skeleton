import React from 'react';
import { Translator, TranslatorType } from '../hooks/useTranslator';

const TranslatorContext = React.createContext<TranslatorType>(
  Translator({
    locale: 'en',
    translations: {}
  })
);

export default TranslatorContext;
