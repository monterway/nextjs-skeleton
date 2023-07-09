import type { AppProps } from 'next/app';
import React, { Fragment } from 'react';
import Head from 'next/head';
import PageLoader from '../src/components/PageLoader/PageLoader';
import useTranslator, { TranslationsType } from '../src/hooks/useTranslator';
import TranslatorContext from '../src/contexts/TranslatorContext';
import 'assets/scss/style.scss';
import { UserType } from '../../types/UserType';
import { onAuthStateChanged } from '@firebase/auth';
import FirebaseAuth from '../src/services/Firebase/FirebaseAuth';
import UserContext from '../src/contexts/UserContext';
import FirebaseDb from '../src/services/Firebase/FirebaseDb';
import { collection, getDocs } from 'firebase/firestore';
import merge from 'deepmerge';
import { ModalType } from '../src/types/ModalType';
import ModalContext from '../src/contexts/ModalContext';
import Modal1 from '../src/components/Modal1/Modal1';

const App = (props: AppProps) => {
  const { Component } = props;

  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<string>('dark');
  const [user, setUser] = React.useState<UserType | null>(null);
  const [modal, setModal] = React.useState<ModalType | null>(null);
  const [firestoreTranslations, setFirestoreTranslations] = React.useState<TranslationsType>({});
  const [translations, setTranslations] = React.useState<TranslationsType>({
    en: {
      test: 'TEST_EN'
    },
    de: {
      test: 'TEST_DE'
    }
  });

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

  React.useEffect(() => {
    setTimeout(() => {
      setIsAppLoaded(true);
    }, 1000);
  }, []);

  const { isLoaded: isTranslatorLoaded, translator } = useTranslator({
    translations
  });

  const isLoading = !isAppLoaded || !isTranslatorLoaded;

  return (
    <Fragment>
      <TranslatorContext.Provider value={translator}>
        <UserContext.Provider value={user}>
          <ModalContext.Provider
            value={{
              value: modal,
              set: setModal
            }}
          >
            <Head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {isLoading ? <PageLoader /> : null}
            <Modal1 value={modal} set={setModal} />
            <Component />
          </ModalContext.Provider>
        </UserContext.Provider>
      </TranslatorContext.Provider>
    </Fragment>
  );
};

export default App;
