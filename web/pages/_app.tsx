import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
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
import { NextSeo } from 'next-seo';

const App = (props: AppProps) => {
  const { Component } = props;
  const isDayNow = (): boolean => {
    const hours = new Date().getHours();
    return hours > 6 && hours < 20;
  };
  const router = useRouter();
  const { pathname, locales, asPath } = router;
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
  }, []);

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
            <NextSeo
              title={translator.translate(`${pathname}_title`)}
              description={translator.translate(`${pathname}_description`)}
              canonical={typeof window !== 'undefined' ? window.location.href : undefined}
              languageAlternates={
                locales
                  ? [
                      {
                        hrefLang: 'x-default',
                        href: `${
                          typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
                        }${new URL(asPath, 'https://www.google.com').pathname}`
                      },
                      ...locales.map((locale) => ({
                        hrefLang: locale,
                        href: `${
                          typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
                        }/${locale}${new URL(asPath, 'https://www.google.com').pathname}`
                      }))
                    ]
                  : []
              }
              themeColor={theme}
              noindex={false}
              nofollow={false}
            />
            {isLoading ? <PageLoader /> : null}
            <Component />
          </UserContext.Provider>
        </TranslatorContext.Provider>
      </ThemeHandlerContext.Provider>
    </Fragment>
  );
};

export default App;
