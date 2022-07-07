import {useRef, useState, useContext} from 'react';
import styled from 'styled-components';
import LanguageContext from '../../store/language-context';
import data from '../../store/content/Cart';

const StyledCheckout = styled.div`
  margin: 1rem 0;
  height: 17rem;
  overflow-y: auto;

  .control {
    margin-bottom: 0.5rem;
  }

  .control label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  .control input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .actions button {
    font: inherit;
    color: #5a1a01;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 25px;
    padding: 0.5rem 2rem;
  }

  .actions button:hover,
  .actions button:active {
    background-color: #ffe6dc;
  }

  .actions .submit {
    border: 1px solid #5a1a01;
    background-color: #5a1a01;
    color: white;
  }

  .actions .submit:hover,
  .actions .submit:active {
    background-color: #7a2706;
  }

  .invalid label {
    color: #ca3e51;
  }

  .invalid input {
    border-color: #aa0b20;
    background-color: #ffeff1;
  }
`;

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = ({onCancel, onConfirm}) => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const handleConfirm = evt => {
    evt.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postalCode = postalCodeInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalCodeIsValid = isFiveChars(postalCode);
    const cityIsValid = !isEmpty(city);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postalCode: postalCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    onConfirm({name, street, city, postalCode});
  };

  return (
    <StyledCheckout>
      <div className={`control ${!formInputsValidity.name && 'invalid'}`}>
        <label htmlFor='name'>{content.nameLabel}</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>{content.nameInvalidMsg}</p>}
      </div>
      <div className={`control ${!formInputsValidity.street && 'invalid'}`}>
        <label htmlFor='street'>{content.streetLabel}</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>{content.streetInvalidMsg}</p>}
      </div>
      <div className={`control ${!formInputsValidity.postalCode && 'invalid'}`}>
        <label htmlFor='postal'>{content.postalLabel}</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>{content.postalInvalidMsg}</p>}
      </div>
      <div className={`control ${!formInputsValidity.city && 'invalid'}`}>
        <label htmlFor='city'>{content.cityLabel}</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>{content.cityInvalidMsg}</p>}
      </div>
      <div className='actions'>
        <button type='button' onClick={onCancel}>
          {content.cancelDisplay}
        </button>
        <button className='submit' onClick={handleConfirm}>
          {content.confirmDisplay}
        </button>
      </div>
    </StyledCheckout>
  );
};

export default Checkout;
