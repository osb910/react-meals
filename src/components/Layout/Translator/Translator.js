import {useState, useEffect} from 'react';
import globe from './globe.svg';
import styled, {keyframes} from 'styled-components';

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
const StyledTranslator = styled.div.attrs(props => ({ariaLabel: 'Language'}))`
  --prim-color: #e63946;
  --sec-color: #a8dadc;
  --ter-color: #457b9d;
  --hex-color: #1d3557;
  --sept-color: #e1eaee;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
  margin: 0;
  border-radius: 12px;
  background-color: var(--prim-color);
  cursor: pointer;
  font-family: 'Calibri';
  color: var(--hex-color);

  & img {
    width: 1.5rem;
    margin-bottom: 0.3em;
    stroke: var(--hex-color);
    color: var(--hex-color);
    border-radius: 50%;
  }

  & .current-lang {
    font-weight: 700;
  }

  & ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    padding: 0;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid var(--sec-color);
    box-shadow: 1px 2px 25px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    top: 1.5rem;
    opacity: 0;
    transition: opacity 300ms ease-in-out;
  }

  &:hover ul {
    visibility: visible;
    opacity: 1;
  }

  & ul li:first-child {
    border-radius: 6px 6px 0 0;
  }

  & ul li:last-child {
    border-radius: 0 0 6px 6px;
  }

  & ul li {
    width: 100%;
    text-align: center;
    padding: 0.4em 0.6em;
    background-color: #fff;
  }

  & ul li:hover {
    background-color: var(--sept-color);
  }

  .dark & {
    color: var(--sept-color);
  }

  .dark & ul li {
    background-color: var(--hex-color);
  }

  .dark & ul li:hover {
    background-color: var(--ter-color);
  }

  &.bump {
    animation: ${bump} 700ms ease-in-out;
  }
`;

const Translator = ({lang, changeLang}) => {
  const [translatorHighlighted, setTranslatorHighlighted] = useState(false);
  useEffect(() => {
    setTranslatorHighlighted(true);
    let timer = setTimeout(() => setTranslatorHighlighted(false), 700);
    return () => clearTimeout(timer);
  }, [lang]);

  const langDisplay = {
    en: 'English',
    ar: 'العربية',
  };
  return (
    <StyledTranslator
      className={translatorHighlighted && 'bump'}
      onClick={changeLang}
    >
      <img src={globe} alt='Language' />
      <div className='current-lang'>{langDisplay[lang]}</div>
      <ul>
        <li data-lang='en'>{langDisplay.en}</li>
        <li data-lang='ar'>{langDisplay.ar}</li>
      </ul>
    </StyledTranslator>
  );
};

export default Translator;
