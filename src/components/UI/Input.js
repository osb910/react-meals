import styled from 'styled-components';
import React from 'react';

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  & label {
    font-weight: bold;
    margin-inline: 1em;
  }

  & input {
    width: 3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font: inherit;
    padding-inline: 0.5em;
  }

  .rtl & input::placeholder {
    font: inherit;
    font-size: 1.3rem;
  }
`;

const Input = React.forwardRef(({label, input}, ref) => (
  <StyledInput>
    <label htmlFor={input.id}>{label}</label>
    <input {...input} ref={ref} />
  </StyledInput>
));

export default Input;
