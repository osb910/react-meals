import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import useHttp from '../../hooks/use-http';
import LanguageContext from '../../store/language-context';
import {BASE_URL} from '../../store/config';
import {arCount, formatNum} from '../../store/utils';
import LoadingSpinner from '../UI/LoadingSpinner';

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  border-bottom: 2px solid #8a2b06;
  padding: 0.5em 0;
  margin: 0.5em 0;

  & h2 {
    text-align: center;
    margin: 0 0 0.5rem 0;
    color: #363636;
  }

  .summary {
    width: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5em;
    align-items: center;
  }

  .rtl & .summary {
    width: 12rem;
  }

  .price {
    font-weight: bold;
    color: #8a2b06;
  }

  .amount {
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 0.25em 0.75em;
    border-radius: 6px;
    color: #363636;
  }

  .actions {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;
  }

  & button {
    height: 2.5rem;
    display: flex;
    align-items: center;
    margin-inline: 1em;
    border-radius: 6px;
    border: 1px solid #8a2b06;
    font: inherit;
    font-weight: bold;
    color: #8a2b06;
    text-align: center;
    background-color: transparent;
    cursor: pointer;
  }

  & button:hover,
  & button:active {
    background-color: #8a2b06;
    color: white;
  }

  @media (min-width: 541px) {
    flex-direction: row;
  }

  @media (min-width: 769px) {
    & h2 {
      text-align: unset;
    }

    .summary {
      flex-direction: row;
    }
  }
`;

const CartItem = ({id, name, price, amount, onAdd, onRemove}) => {
  const {lang} = useContext(LanguageContext);
  const {isLoading, sendRequest: getMeals} = useHttp();
  const [nameLang, setNameLang] = useState('');
  useEffect(() => {
    const loadMeals = data => {
      const content = data[lang];
      const meals = Object.entries(content.meals).map(([id, props]) => ({
        id,
        name: props.name,
        description: props.description,
        price: props.price,
      }));
      setNameLang(meals.find(item => item.id === id).name);
    };

    getMeals({url: `${BASE_URL}meals.json`}, loadMeals);
  }, [lang, getMeals, id]);

  const formattedPrice =
    lang === 'ar'
      ? arCount(price, {
          sng: 'دولار',
          pair: 'دولاران',
          plr: 'دولارات',
          zero: 'صفر',
        })
      : `$${price.toFixed(2)}`;

  const formattedAmount = formatNum(amount, lang === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <StyledItem>
      <div>
        {isLoading && <LoadingSpinner lang={lang} />}
        <h2>{nameLang}</h2>
        <div className='summary'>
          <span className='price'>{formattedPrice}</span>
          <span className='amount'>x {formattedAmount}</span>
        </div>
      </div>
      <div className='actions'>
        <button onClick={onRemove.bind(null, id)}>−</button>
        <button onClick={onAdd.bind(null, {id, name, price, amount: 1})}>
          +
        </button>
      </div>
    </StyledItem>
  );
};

export default CartItem;
