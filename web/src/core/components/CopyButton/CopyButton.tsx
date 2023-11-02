import { Button } from 'react-bootstrap';
import { ButtonProps } from 'react-bootstrap/Button';
import React from 'react';

export interface CopyButtonProps {
  children: JSX.Element | JSX.Element[];
  messageChildren: JSX.Element | JSX.Element[];
  copyContent: string;
  buttonProps?: ButtonProps;
}

const CopyButton = (props: CopyButtonProps): JSX.Element | null => {
  const { children, messageChildren, copyContent, buttonProps } = props;
  const [showMessage, setShowMessage] = React.useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(copyContent);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <Button className="copy-button" onClick={copy} {...buttonProps}>
      <div className={`copy-button__content ${!showMessage ? 'copy-button__content--active' : ''}`}>{children}</div>
      <div className={`copy-button__message ${showMessage ? 'copy-button__message--active' : ''}`}>
        {messageChildren}
      </div>
    </Button>
  );
};

export default CopyButton;
