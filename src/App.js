import {useContext} from 'react';
import styled from 'styled-components';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartContext from './store/cart-context';
import LanguageContext from './store/language-context';
import clickSfx from './assets/sfx/Light-Switch-ON_OFF.mp3';

const StyledApp = styled.div`
  box-sizing: border-box;
  margin: 0;
  text-align: center;
  transition: all 400ms ease;

  &.rtl {
    direction: rtl;
    font-family: 'KFGQPC Uthman Taha Naskh';
    font-size: 1.2rem;
  }
`;

const App = () => {
  const cartCtx = useContext(CartContext);
  const langCtx = useContext(LanguageContext);
  document.title = langCtx.lang === 'ar' ? 'سفرة ريئكت' : 'React Meals';

  return (
    <StyledApp className={langCtx.lang === 'ar' ? 'rtl' : ''}>
      {cartCtx.isCartVisible && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
      <audio id='click-sfx' src={clickSfx} preload='none'></audio>
    </StyledApp>
  );
};

export default App;
