import {Button, Modal} from "react-bootstrap";
import React from "react";
import {ModalContextType} from "../../contexts/ModalContext";

const Modal1 = (props: ModalContextType): JSX.Element|null => {
  const { value, set } = props;
  const [isShown, setIsShown] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsShown(value !== null);
  }, [
    value,
  ]);

  const hide = () => {
    setIsShown(false);
    setTimeout(() => set(null), 1000);
  };

  return (
    <Modal show={isShown} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{ value?.title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ value?.description }</Modal.Body>
      <Modal.Footer>
        {
          value?.hasClose ? (
            <Button variant="secondary" onClick={hide}>
              Close
            </Button>
          ) : null
        }
        {
          value?.primary ? (
            <Button variant="primary" onClick={value?.primary.onClick}>
              { value?.primary.title }
            </Button>
          ) : null
        }
      </Modal.Footer>
    </Modal>
  );
};

export default Modal1;
