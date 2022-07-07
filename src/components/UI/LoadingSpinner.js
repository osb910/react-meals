import styled, {keyframes, css} from 'styled-components';
import React from 'react';
// import LanguageContext from '../../store/language-context';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoadingSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 54px;
  height: 54px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 44px;
    height: 44px;
    margin: 6px;
    border: 6px solid #ff2058;
    border-radius: 50%;
    animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    ${props =>
      props.lang === 'ar' &&
      css`
        animation-direction: reverse;
      `}
    border-color: #ff2058 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const LoadingSpinner = ({lang}) => (
  <StyledLoadingSpinner lang={lang}>
    <div />
    <div />
    <div />
    <div />
  </StyledLoadingSpinner>
);

export default LoadingSpinner;
