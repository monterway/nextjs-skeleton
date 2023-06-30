import React from 'react';
import TranslatorContext from '../src/contexts/TranslatorContext';
import Page from "../src/components/Page/Page";

const Contact = () => {
  const translator = React.useContext(TranslatorContext);

  return (
    <Page>
      <h1>{translator?.translate('test')}</h1>
    </Page>
  );
};

export default Contact;
