import React from 'react';
import styled from 'styled-components';

const StyledErrorModal = styled.div`
  position: fixed;
  top: 30vh;
  left: calc(50% - 15rem);
  width: 30rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  z-index: 100;
  border-radius: 7px;

  & h2 {
    margin: 0;
    padding: 1rem;
    background: #ff2058;
    color: white;
    border-radius: 7px 7px 0 0;
  }

  & p {
    padding: 1rem;
  }

  .error-modal__actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.5rem;
  }

  .error-modal__actions button {
    margin: 0.5em;
    padding: 0.3em 0.6em;
    background: #ff2058;
    color: white;
    border: 0;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }

  .error-modal__actions button:hover {
    background-color: #cc2336;
  }
`;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  z-index: 50;
`;

const ErrorModal = React.memo(props => {
  return (
    <React.Fragment>
      <StyledBackdrop onClick={props.onClose} />
      <StyledErrorModal>
        {props.lang === 'en' && <h2>An Error Occurred!</h2>}
        {props.lang === 'ar' && <h2>وقع خطأ!</h2>}
        <p>{props.children}</p>
        <div className='error-modal__actions'>
          <button type='button' onClick={props.onClose}>
            Okay
          </button>
        </div>
      </StyledErrorModal>
    </React.Fragment>
  );
});

export default ErrorModal;
