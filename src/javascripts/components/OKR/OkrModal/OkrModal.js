import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import './OkrModal.css';
import closeIcon from '../../../../assets/images/close.svg';
import PropTypes from "prop-types";

const appElement = document.getElementById('root');

const OkrModal = ({header, children, updateModalState}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOverlayClick = event => {
      if (!(modalRef.current && modalRef.current.contains(event.target))) {
        updateModalState();
        appElement.removeAttribute('aria-hidden');
        window.removeEventListener('click', handleOverlayClick);
      }
    };

    setTimeout(() => {
      appElement.setAttribute('aria-hidden', 'true');
      window.addEventListener('click', handleOverlayClick);
    });

    return () => {
      appElement.removeAttribute('aria-hidden');
      window.removeEventListener('click', handleOverlayClick);
    }
  }, [updateModalState]);

  const onCloseHandler = () => {
    updateModalState();
  };

  return ReactDOM.createPortal(
    <div className='modal'>
      <div className='modal__wrapper' ref={modalRef}>
        <button className='modal__wrapper__close' onClick={onCloseHandler}>
          <img src={closeIcon} alt="close"/>
        </button>
        <div className='modal__wrapper__header'>
          <h2>{header}</h2>
        </div>
        <hr/>
        <div className='modal__wrapper__content'>
          {children}
        </div>
        <div className='modal__wrapper__footer'>
          <button onClick={onCloseHandler}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

OkrModal.propTypes = {
  header: PropTypes.string,
  updateModalState: PropTypes.func,
  children: PropTypes.array
};

export default OkrModal;
