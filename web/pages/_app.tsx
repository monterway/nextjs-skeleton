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

const App = (props: AppProps) => {
  const { Component } = props;

  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<ThemeType>('light');
  const [user, setUser] = React.useState<UserType | null>(null);
  const [firestoreTranslations, setFirestoreTranslations] = React.useState<TranslationsType>({});
  const [translations, setTranslations] = React.useState<TranslationsType>({
    bg: {
      navbar_home: 'Начало',
      navbar_contact: 'Контакт',
      welcome_feature_1_title: 'We love your home ...',
      welcome_feature_1_description: 'Панелисимо е вносител на висококачествени панели за интериорно облицоване.',
      welcome_feature_1_button: 'Каталог',
      stone_feature_1_title: 'Stone ...',
      stone_feature_1_description: 'Това е най-новата ни серия от камък.',
      stone_feature_1_button: 'Разгледайте',
      cloth_feature_1_title: 'Cloth ...',
      cloth_feature_1_description: 'Това е най-новата ни серия от текстил.',
      cloth_feature_1_button: 'Разгледайте',
      wood_feature_1_title: 'Wood ...',
      wood_feature_1_description: 'Това е най-новата ни серия от дърво.',
      wood_feature_1_button: 'Разгледайте',
      metal_feature_1_title: 'Metal ...',
      metal_feature_1_description: 'Това е най-новата ни серия от метал.',
      metal_feature_1_button: 'Разгледайте',
      color_feature_1_title: 'Solid color ...',
      color_feature_1_description: 'Това е най-новата ни серия от цветове.',
      color_feature_1_button: 'Разгледайте'
    },
    en: {
      navbar_home: 'Home',
      navbar_contact: 'Contact',
      welcome_feature_1_title: 'We love your home ...',
      welcome_feature_1_description: 'Panelsimo is a provider of high-quality interior cladding panels.',
      welcome_feature_1_button: 'Catalog',
      stone_feature_1_title: 'Stone ...',
      stone_feature_1_description: 'This is our latest series of stone.',
      stone_feature_1_button: 'Explore',
      cloth_feature_1_title: 'Cloth ...',
      cloth_feature_1_description: 'This is our latest series of cloth.',
      cloth_feature_1_button: 'Explore',
      wood_feature_1_title: 'Wood ...',
      wood_feature_1_description: 'This is our latest series of wood.',
      wood_feature_1_button: 'Explore',
      metal_feature_1_title: 'Metal ...',
      metal_feature_1_description: 'This is our latest series of metal.',
      metal_feature_1_button: 'Explore',
      color_feature_1_title: 'Solid color ...',
      color_feature_1_description: 'This is our latest series of colors.',
      color_feature_1_button: 'Explore'
    },
    de: {
      navbar_home: 'Startseite',
      navbar_contact: 'Kontakt',
      welcome_feature_1_title: 'Wir lieben dein Zuhause ...',
      welcome_feature_1_description: 'Panelsimo ist ein Anbieter hochwertiger Innenverkleidungspaneele.',
      welcome_feature_1_button: 'Katalog',
      stone_feature_1_title: 'Stone ...',
      stone_feature_1_description: 'Dies ist unsere neueste Serie von Steinen.',
      stone_feature_1_button: 'Ansehen',
      cloth_feature_1_title: 'Cloth ...',
      cloth_feature_1_description: 'Dies ist unsere neueste Textilserie.',
      cloth_feature_1_button: 'Ansehen',
      wood_feature_1_title: 'Wood ...',
      wood_feature_1_description: 'Dies ist unsere neueste Holzserie.',
      wood_feature_1_button: 'Ansehen',
      metal_feature_1_title: 'Metal ...',
      metal_feature_1_description: 'Dies ist unsere neueste Metallserie.',
      metal_feature_1_button: 'Ansehen',
      color_feature_1_title: 'Solid color ...',
      color_feature_1_description: 'Dies ist unsere neueste Farbserie.',
      color_feature_1_button: 'Ansehen'
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
