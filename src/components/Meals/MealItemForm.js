import React, {useState, useRef, useContext, useEffect} from 'react';
import styled from 'styled-components';
import LanguageContext from '../../store/language-context';
import CartContext from '../../store/cart-context';
import Input from '../UI/Input';
import useHttp from '../../hooks/use-http';
import {BASE_URL} from '../../store/config';
import LoadingSpinner from '../UI/LoadingSpinner';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;

  & button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.2em 1.5em;
    border-radius: 20px;
    font-weight: bold;
  }

  & button:hover,
  & button:active {
    background-color: #641e03;
    border-color: #641e03;
  }

  @media (min-width: 541px) {
    align-items: flex-end;
  }
`;

const MealItemForm = ({id, name, price}) => {
  const {lang} = useContext(LanguageContext);
  const [text, setText] = useState({});
  const {isLoading, sendRequest: getMeals} = useHttp();

  useEffect(() => {
    const loadData = data => {
      const {addDisplay, amountDisplay, invalidInput} = data[lang];

      setText({addDisplay, amountDisplay, invalidInput});
    };

    getMeals(
      {
        url: `${BASE_URL}meals.json`,
      },
      loadData
    );
  }, [lang, getMeals]);

  const amountRef = useRef();

  const cartCtx = useContext(CartContext);

  const [amountIsValid, setAmountIsValid] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    const amount = amountRef.current.value;
    const amountNum = amount;
    if (!amount.trim().length || amountNum < 1 || amountNum > 5) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    cartCtx.onAddItem({id, name, price, amount: amountNum});
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner lang={lang} />}
      <StyledForm onSubmit={handleSubmit}>
        <Input
          ref={amountRef}
          label={text.amountDisplay}
          input={{
            id: 'amount' + id,
            type: 'number',
            step: '1',
            defaultValue: '1',
          }}
        />
        <button>+ {text.addDisplay}</button>
        {!amountIsValid && <p>{text.invalidInput}</p>}
      </StyledForm>
    </React.Fragment>
  );
};

export default MealItemForm;
