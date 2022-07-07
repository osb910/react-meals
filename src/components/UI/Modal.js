import {Fragment, useContext} from 'react';
import {createPortal} from 'react-dom';
import styled, {keyframes} from 'styled-components';
import LanguageContext from '../../store/language-context';

const slideDown = keyframes`
from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const StyledModal = styled.div`
  position: fixed;
  top: 10vh;
  left: 5%;
  width: 90%;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  overflow: auto;
  margin: auto;
  z-index: 30;
  animation: ${slideDown} 300ms ease-out forwards;

  &.rtl {
    direction: rtl;
    font-family: 'KFGQPC Uthman Taha Naskh';
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    width: 40rem;
    left: calc(50% - 20rem);
  }
`;

const ModalOverlay = ({children}) => {
  const langCtx = useContext(LanguageContext);
  return (
    <StyledModal className={langCtx.lang === 'ar' ? 'rtl' : ''}>
      <div className='content'>{children}</div>
    </StyledModal>
  );
};

const portalEl = document.querySelector('#overlays');

const Modal = ({children, clickHandler}) => {
  return (
    <Fragment>
      {createPortal(<StyledBackdrop onClick={clickHandler} />, portalEl)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalEl)}
    </Fragment>
  );
};

export default Modal;
