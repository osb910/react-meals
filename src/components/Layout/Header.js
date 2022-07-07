import React, {useContext} from 'react';
import styled from 'styled-components';
import mealsImg from '../../assets/meals.jpg';
import LanguageContext from '../../store/language-context';
import HeaderCartButton from './HeaderCartButton';
import Translator from './Translator/Translator';
import data from '../../store/content/Header';

const StyledHeader = styled.header`
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    background-color: #8a2b06;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 1em;
    padding: 0.5em;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 10;
  }

  .header h1 {
    margin: 0;
  }

  .main-image {
    width: 100%;
    height: 25rem;
    z-index: 0;
    overflow: hidden;
  }

  .main-image img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
  }

  @media (min-width: 541px) {
    .header {
      flex-direction: row;
      padding: 0 1em;
    }

    .header h1 {
      margin: 0.5em 0;
    }
  }

  @media (min-width: 769px) {
    .header {
      padding: 0 1.5em;
    }
  }

  @media (min-width: 980px) {
    .header {
      padding: 0 2em;
    }
  }
`;

const Header = () => {
  const langCtx = useContext(LanguageContext);
  const {lang} = langCtx;
  const content = data[lang];

  const handleTranslator = evt => {
    const newLang = evt.target.dataset.lang;
    if (!newLang || lang === newLang) return;
    langCtx.onChangeLang(newLang);
  };

  return (
    <StyledHeader>
      <div className='header'>
        <h1 aria-hidden='true' aria-label={content.logoAria}>
          {content.logo}
        </h1>
        <HeaderCartButton cartText={content.cart} />
        <Translator lang={lang} changeLang={handleTranslator} />
      </div>
      <div className='main-image'>
        <img src={mealsImg} alt='meals' />
      </div>
    </StyledHeader>
  );
};

export default Header;
