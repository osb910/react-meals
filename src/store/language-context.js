import React, {useReducer} from 'react';
const LanguageContext = React.createContext({
  lang: '',
  onChangeLang: () => {},
});

const defaultLangState = {
  lang: JSON.parse(localStorage.getItem('lang')) || 'en',
};

const click = () => document.querySelector('#click-sfx').play();

const langReducer = (state, action) => {
  if (action.type === 'TRANSLATE') {
    return {...state, lang: action.lang};
  }
  return defaultLangState;
};

export const LangProvider = props => {
  const [langState, dispatchLang] = useReducer(langReducer, defaultLangState);

  const translate = lang => {
    click();
    dispatchLang({type: 'TRANSLATE', lang});
    localStorage.setItem('lang', JSON.stringify(lang));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: langState.lang,
        onChangeLang: translate,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
