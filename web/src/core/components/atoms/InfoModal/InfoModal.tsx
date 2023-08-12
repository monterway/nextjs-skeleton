import React from 'react';
import InfoModalContext from '../../../contexts/InfoModalContext';

const InfoModal = (): JSX.Element | null => {
  const infoModal = React.useContext(InfoModalContext);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsActive(infoModal.get !== null);
    }, 200);
  }, [infoModal.get]);

  return (
    <div
      className={`info-modal ${infoModal.get !== null ? 'info-modal--active' : ''}`}
      onClick={() => infoModal.set(null)}
    >
      {infoModal.get !== null ? (
        <div className={`info-modal__card ${isActive ? 'info-modal__card--active' : ''} card`}>
          {infoModal.get.icon ? (
            <h1 className="display-3 m-0 p-0 mb-3">
              <i className={`bi bi-${infoModal.get.icon} text-primary`}></i>
            </h1>
          ) : null}
          <h1 className="m-0 p-0">{infoModal.get.title}</h1>
          {infoModal.get.description ? <p className="m-0 p-0 mt-3">{infoModal.get.description}</p> : null}
          {infoModal.get.list && infoModal.get.list.length ? (
            <ul className="info-modal__card-list m-0 p-0 mt-3">
              {infoModal.get.list.map((item) => (
                <li className="info-modal__card-list-item">
                  <i className="bi bi-arrow-right"></i>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default InfoModal;
