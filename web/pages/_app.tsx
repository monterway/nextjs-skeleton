import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Head from 'next/head';
import PageLoader from '../src/components/PageLoader/PageLoader';
import useTranslator from '../src/hooks/useTranslator';
import TranslatorContext from '../src/contexts/TranslatorContext';
import 'assets/scss/style.scss';
import { UserType } from '../../types/UserType';
import { onAuthStateChanged } from '@firebase/auth';
import FirebaseAuth from '../src/services/Firebase/FirebaseAuth';
import UserContext from '../src/contexts/UserContext';

const App = (props: AppProps) => {
  const { Component } = props;

  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<string>('dark');
  const [user, setUser] = React.useState<UserType | null>(null);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const subscriber = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user && user.email) {
        setUser({
          email: user.email
        });
      }
    });
    return () => subscriber();
  }, []);

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
        <UserContext.Provider value={user}>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          {isLoading ? <PageLoader /> : null}
          <Component />
        </UserContext.Provider>
      </TranslatorContext.Provider>
    </Fragment>
  );
};

export default App;
