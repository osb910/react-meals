import React, {useReducer} from 'react';
const CartContext = React.createContext({
  isCartVisible: false,
  onCartOpen: () => {},
  onCartClose: () => {},
  items: [],
  total: 0,
  onAddItem: item => {},
  onRemoveItem: id => {},
  onClearCart: () => {},
});

const defaultCartState = JSON.parse(localStorage.getItem('cart')) || {
  isCartVisible: false,
  items: [],
  total: 0,
};

const click = () => document.querySelector('#click-sfx').play();

const cartReducer = (state, action) => {
  if (action.type === 'OPEN') {
    const newState = {...state, isCartVisible: true};
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }
  if (action.type === 'CLOSE') {
    const newState = {...state, isCartVisible: false};
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }
  if (action.type === 'ADD') {
    click();
    const isItemIn = state.items.some(item => item.id === action.item.id);
    const updatedItems = isItemIn
      ? state.items.map(item =>
          item.id === action.item.id
            ? {
                ...item,
                amount: `${Number(item.amount) + Number(action.item.amount)}`,
              }
            : item
        )
      : [...state.items, action.item];

    const updatedTotal = state.total + action.item.price * action.item.amount;
    const newState = {...state, items: updatedItems, total: updatedTotal};
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }
  if (action.type === 'REMOVE') {
    const removed = state.items.find(item => item.id === action.id);

    const updatedItems =
      removed.amount < 2
        ? state.items.filter(item => item.id !== removed.id)
        : state.items.map(item =>
            item.id === removed.id ? {...item, amount: item.amount - 1} : item
          );
    const updatedTotal = state.total - removed.price;
    const newState = {...state, items: updatedItems, total: updatedTotal};
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;
  }
  if (action.type === 'CLEAR') {
    console.log('runs');
    return {
      isCartVisible: false,
      items: [],
      total: 0,
    };
  }
  return defaultCartState;
};

export const CartProvider = props => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const openCart = () => dispatchCart({type: 'OPEN'});
  const closeCart = () => dispatchCart({type: 'CLOSE'});
  const addItem = item => dispatchCart({type: 'ADD', item});
  const removeItem = id => dispatchCart({type: 'REMOVE', id});

  const clearCart = () => {
    dispatchCart({type: 'CLEAR'});
  };

  return (
    <CartContext.Provider
      value={{
        isCartVisible: cartState.isCartVisible,
        onCartOpen: openCart,
        onCartClose: closeCart,
        items: cartState.items,
        total: cartState.total,
        onAddItem: addItem,
        onRemoveItem: removeItem,
        onClearCart: clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
