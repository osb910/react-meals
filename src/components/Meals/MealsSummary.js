import React, {useContext} from 'react';
import styled from 'styled-components';
import {nanoid} from 'nanoid';
import LanguageContext from '../../store/language-context';
import data from '../../store/content/Summary';

const StyledMealsSummary = styled.section`
  text-align: center;
  max-width: 45rem;
  width: 90%;
  margin: auto;
  margin-top: -8rem;
  position: relative;
  background-color: #383838;
  color: white;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 1px 18px 10px rgba(0, 0, 0, 0.25);

  & h2 {
    font-size: 2rem;
    margin-top: 0;
  }

  .rtl & p {
    font-size: 1.3rem;
  }
`;

const MealsSummary = () => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];

  return (
    <StyledMealsSummary>
      <h2>{content.title}</h2>
      {content.paras.map(p => (
        <p key={nanoid()}>{p}</p>
      ))}
    </StyledMealsSummary>
  );
};

export default MealsSummary;
