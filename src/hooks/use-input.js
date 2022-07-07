import {useReducer} from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  const actions = {
    INPUT: () => ({value: action.value, isTouched: state.isTouched}),
    BLUR: () => ({isTouched: true, value: state.value}),
    RESET: () => ({value: '', isTouched: false}),
    '': () => initialInputState,
  };
  return actions[action.type]();
};

const useInput = validateValue => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const handleValueChange = evt => {
    dispatchInput({type: 'INPUT', value: evt.target.value});
  };

  const handleInputBlur = evt => {
    dispatchInput({type: 'BLUR'});
  };

  const reset = () => {
    dispatchInput({type: 'RESET'});
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    handleValueChange,
    handleInputBlur,
    reset,
  };
};

export default useInput;
