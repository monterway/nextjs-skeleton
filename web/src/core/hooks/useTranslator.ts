import React from 'react';
import { useRouter } from 'next/router';
import { flatten } from 'flat';

export interface TranslationType {
  [translationId: string]: string;
}

export interface TranslationsType {
  [locale: string]: TranslationType;
}

export interface TranslatorProps {
  locale: string;
  translations: TranslationsType;
}

export interface TranslatorType {
  locale: string;
  translate: (
    translationId: string,
    values?: {
      [placeholderId: string]: string;
    }
  ) => string;
}

export interface UseTranslatorProps {
  translations: TranslationsType;
}

export interface UseTranslatorType {
  isLoaded: boolean;
  translator: TranslatorType;
}

export const Translator = (props: TranslatorProps): TranslatorType => {
  const { locale, translations } = props;

  return {
    locale,
    translate: (translationId, values = {}) => {
      const translationIdWithLocale = locale + '.' + translationId;
      const flattedTranslations = flatten.flatten(translations) as {
        [key: string]: string;
      };
      const message = Object.keys(flattedTranslations).includes(translationIdWithLocale)
        ? (flattedTranslations[translationIdWithLocale] as string)
        : translationIdWithLocale;
      if (Object.keys(values).length > 0) {
        let parsedMessage = message;
        Object.keys(values).forEach((valueKey) => {
          parsedMessage = parsedMessage.replace('{{ ' + valueKey + ' }}', values[valueKey]);
        });
        return parsedMessage;
      }
      return message;
    }
  };
};

const useTranslator = (props: UseTranslatorProps): UseTranslatorType => {
  const { translations } = props;
  const { locale = 'en' } = useRouter();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [translator, setTranslator] = React.useState<TranslatorType>(
    Translator({
      locale,
      translations
    })
  );

  React.useEffect(() => {
    setIsLoaded(false);
    if (locale) {
      const translator = Translator({
        locale,
        translations
      });
      setTranslator(translator);
    }
    setIsLoaded(true);
  }, [locale]);

  return {
    isLoaded,
    translator
  };
};

export default useTranslator;
