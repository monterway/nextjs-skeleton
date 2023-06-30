import React from "react";
import TranslatorContext from "../src/contexts/TranslatorContext";

const Contact = () => {
  const translator = React.useContext(TranslatorContext);

  return (
    <h1>{ translator?.translate('test') }</h1>
  );
};

export default Contact;
