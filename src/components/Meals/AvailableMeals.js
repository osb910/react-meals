import {useContext, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorModal from '../UI/ErrorModal';
import LanguageContext from '../../store/language-context';
import useHttp from '../../hooks/use-http';
import {BASE_URL} from '../../store/config';
import MealItem from './MealItem';

const mealsAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledAvailableMeals = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: ${mealsAppear} 1s ease-out forwards;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .rtl & ul li {
    font-size: 1.3rem;
  }
`;

const AvailableMeals = () => {
  const {lang} = useContext(LanguageContext);
  const [mealsList, setMealsList] = useState([]);

  const {isLoading, error, setError, sendRequest: getMeals} = useHttp();
  useEffect(() => {
    const loadMeals = data => {
      const content = data[lang];
      const meals = Object.entries(content.meals).map(([id, props]) => ({
        id,
        name: props.name,
        description: props.description,
        price: props.price,
      }));
      setMealsList(meals.map(props => <MealItem {...props} key={props.id} />));
    };

    getMeals({url: `${BASE_URL}meals.json`}, loadMeals);
  }, [lang, getMeals]);

  const clearError = () => {
    setError(null);
  };

  return (
    <StyledAvailableMeals>
      <Card>
        {isLoading && <LoadingSpinner lang={lang} />}
        {error && (
          <ErrorModal lang={lang} onClose={clearError}>
            {error}
          </ErrorModal>
        )}
        <ul>{mealsList}</ul>
      </Card>
    </StyledAvailableMeals>
  );
};

export default AvailableMeals;
