import React from 'react';
import { TranslatorType } from '../hooks/useTranslator';

const TranslatorContext = React.createContext<TranslatorType | null>(null);

export default TranslatorContext;
