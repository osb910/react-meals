import React from 'react';
import ReactDOM from 'react-dom/client';
import {CartProvider} from './store/cart-context';
import {LangProvider} from './store/language-context';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LangProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </LangProvider>
);
