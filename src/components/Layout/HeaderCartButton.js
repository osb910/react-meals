import {useEffect, useContext, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import LanguageContext from '../../store/language-context';

const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.75em 2em;
  border: none;
  border-radius: 25px;
  background-color: #4d1601;
  color: white;
  font: inherit;
  font-weight: bold;
  cursor: pointer;

  .rtl & {
    padding: 0.5em 1.5em;
  }

  &:hover,
  &:active {
    background-color: #2c0d00;
  }

  .icon {
    width: 1.35rem;
    height: 1.35rem;
    margin-inline: 0.5rem;
  }

  .badge {
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b94517;
    border-radius: 50%;
    margin-inline: 0.5em;
    font-weight: bold;
  }

  .rtl & span {
    font-size: 1.3rem;
  }

  &:hover .badge,
  &:active .badge {
    background-color: #92320c;
  }

  &.bump {
    animation: ${bump} 300ms ease-out;
  }
`;

const HeaderCartButton = ({cartText}) => {
  const cartCtx = useContext(CartContext);
  const {lang} = useContext(LanguageContext);

  const {items} = cartCtx;
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    setIsBtnHighlighted(true);
    let timer = setTimeout(() => setIsBtnHighlighted(false), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numCartItems = cartCtx.items.reduce(
    (acc, i) => acc + Number(i.amount),
    0
  );
  return (
    <StyledBtn
      className={isBtnHighlighted && 'bump'}
      onClick={cartCtx.onCartOpen}
    >
      <span className='icon'>
        <CartIcon />
      </span>
      <span>{cartText}</span>
      <span className='badge'>
        {lang === 'ar' ? numCartItems.toLocaleString('ar-EG') : numCartItems}
      </span>
    </StyledBtn>
  );
};
export default HeaderCartButton;
