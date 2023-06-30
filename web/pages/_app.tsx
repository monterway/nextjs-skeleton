import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Head from 'next/head';
import PageLoader from '../src/components/PageLoader/PageLoader';
import useTranslator from '../src/hooks/useTranslator';
import TranslatorContext from '../src/contexts/TranslatorContext';

const App = (props: AppProps) => {
  const { Component } = props;

  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 1000);
  }, []);

  const { isLoaded: isTranslatorLoaded, translator } = useTranslator({
    translations: {
      en: {
        test: 'TEST_EN'
      },
      de: {
        test: 'TEST_DE'
      }
    }
  });

  const isLoading = !isAppLoaded || !isTranslatorLoaded;

  return (
    <Fragment>
      <TranslatorContext.Provider value={translator}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        {isLoading ? <PageLoader /> : null}
        <Component />
      </TranslatorContext.Provider>
    </Fragment>
  );
};

export default App;
