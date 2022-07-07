import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import CartContext from '../../store/cart-context';
import LanguageContext from '../../store/language-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import data from '../../store/content/Cart';
import {arCount} from '../../store/utils';
import {BASE_URL} from '../../store/config';
import LoadingSpinner from '../UI/LoadingSpinner';

const StyledCart = styled.section`
  margin: auto;
  max-height: 80vh;
  overflow: auto;
  .cart-items {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 20rem;
    overflow: auto;
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    margin: 1em 0.2em;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .actions button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.4em 1.5em;
    border-radius: 25px;
    margin-inline: 0.5em;
  }

  .actions button:last-child {
    margin-inline-end: 0;
  }

  .actions button:hover,
  .actions button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }

  .actions .button--alt {
    color: #8a2b06;
  }

  .actions .button {
    background-color: #8a2b06;
    color: white;
  }

  @media (min-width: 541px) {
    .actions {
    }
  }
`;

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const {lang} = useContext(LanguageContext);
  const content = data[lang];

  const formattedTotal =
    lang === 'ar'
      ? arCount(Math.abs(cartCtx.total), {
          sng: 'دولار',
          pair: 'دولاران',
          plr: 'دولارات',
          zero: 'صفر',
        })
      : `$${Math.abs(cartCtx.total).toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map(item => (
        <CartItem
          {...item}
          key={item.id}
          onAdd={cartCtx.onAddItem}
          onRemove={cartCtx.onRemoveItem}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const cancelCheckout = () => {
    setIsCheckout(false);
  };

  const handleConfirm = async userData => {
    setIsSubmitting(true);
    const res = await fetch(`${BASE_URL}orders.json`, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.onClearCart();
  };

  const modalActions = (
    <div className='actions'>
      <button className='button--alt' onClick={cartCtx.onCartClose}>
        {content.closeDisplay}
      </button>
      {hasItems && (
        <button className='button' onClick={handleOrder}>
          {content.orderDisplay}
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <StyledCart>
      {cartItems}
      <div className='total'>
        <span>{content.totalDisplay}</span>
        <span>
          {cartCtx.total === 0 && lang === 'ar' ? 'صفر' : formattedTotal}
        </span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={handleConfirm} onCancel={cancelCheckout} />
      )}
      {!isCheckout && modalActions}
    </StyledCart>
  );

  const isSubmittingModalContent = (
    <React.Fragment>
      <LoadingSpinner lang={lang} />
      <p>{content.sendingDisplay}</p>
    </React.Fragment>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>{content.sentDisplay}</p>
      <div className='actions'>
        <button className='button--alt' onClick={cartCtx.onCartClose}>
          {content.closeDisplay}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal clickHandler={cartCtx.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
