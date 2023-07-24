import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Head from 'next/head';
import PageLoader from '../src/core/components/atoms/PageLoader/PageLoader';
import useTranslator, { TranslationsType } from '../src/core/hooks/useTranslator';
import TranslatorContext from '../src/core/contexts/TranslatorContext';
import 'core/assets/scss/style.scss';
import { UserType } from '../../types/UserType';
import { onAuthStateChanged } from '@firebase/auth';
import FirebaseAuth from '../src/core/services/Firebase/FirebaseAuth';
import UserContext from '../src/core/contexts/UserContext';
import FirebaseDb from '../src/core/services/Firebase/FirebaseDb';
import { collection, getDocs } from 'firebase/firestore';
import merge from 'deepmerge';
import ThemeHandlerContext, { ThemeType } from '../src/core/contexts/ThemeHandlerContext';
import { useRouter } from 'next/router';
import SeoHandler from '../src/core/modules/SeoHandler/SeoHandler';

const App = (props: AppProps) => {
  const { Component } = props;
  const isDayNow = (): boolean => {
    const hours = new Date().getHours();
    return hours > 6 && hours < 20;
  };
  const router = useRouter();
  const { pathname } = router;
  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<ThemeType>(isDayNow() ? 'light' : 'dark');
  const [user, setUser] = React.useState<UserType | null>(null);
  const [firestoreTranslations, setFirestoreTranslations] = React.useState<TranslationsType>({});
  const [translations, setTranslations] = React.useState<TranslationsType>({});

  React.useEffect(() => {
    setIsAppLoaded(false);
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 600);
  }, [pathname]);

  React.useEffect(() => {
    const collectionRef = collection(FirebaseDb, 'translations');
    getDocs(collectionRef).then((querySnapshot) => {
      const newFirestoreTranslations = querySnapshot.docs.reduce(
        (newFirestoreTranslations, doc) => ({
          ...newFirestoreTranslations,
          [doc.id]: doc.data()
        }),
        {}
      );
      setFirestoreTranslations(newFirestoreTranslations);
    });
  }, []);

  React.useEffect(() => {
    setTranslations((translations) => ({
      ...merge.all([translations, firestoreTranslations])
    }));
  }, [firestoreTranslations]);

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

  const { isLoaded: isTranslatorLoaded, translator } = useTranslator({
    translations
  });

  const Seo = SeoHandler({
    pathname,
    translator: translator ? translator : undefined
  });

  const isLoading = !isAppLoaded || !isTranslatorLoaded;

  return (
    <Fragment>
      <ThemeHandlerContext.Provider
        value={{
          set: setTheme,
          get: theme
        }}
      >
        <TranslatorContext.Provider value={translator}>
          <UserContext.Provider value={user}>
            <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="icon" type="image/x-icon" href="/favicon.svg" />
              {Seo.getTitleTag()}
              {Seo.getDescriptionTag()}
            </Head>
            {isLoading ? <PageLoader /> : null}
            <Component />
          </UserContext.Provider>
        </TranslatorContext.Provider>
      </ThemeHandlerContext.Provider>
    </Fragment>
  );
};

export default App;
