import React from 'react';
import TranslatorContext from '../src/contexts/TranslatorContext';
import Page from "../src/components/Page/Page";
import GoogleSignInButton from "../src/components/GoogleSignInButton/GoogleSignInButton";

const Contact = () => {
  const translator = React.useContext(TranslatorContext);

  return (
    <Page>
      <h1>{translator?.translate('test')}</h1>
      <GoogleSignInButton/>
    </Page>
  );
};

export default Contact;
