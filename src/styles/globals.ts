import { darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline:0;
    font-family: 'Roboto';
  }
  body {
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.text};
    -webkit-font-smoothing:antialiased;
  }
  html, body, #root {
    height:100%;
  }
  body, input, button {
    font-size: 16px;
  }
  h1,h2,h3,h4 {
    font-weight: 500;
  }
  button {
    cursor:pointer;
    transition: all 0.3s;
  }
  input {
    ::placeholder {
    }
  }
   /* width */
   ::-webkit-scrollbar {
    width: 14px;
    border-left:1px solid ${(props) => props.theme.colors.borderColor};
    border-right:1px solid ${(props) => props.theme.colors.borderColor};
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.secondary};
    border-left:1px solid ${(props) => props.theme.colors.secondaryLighter};
    border-left:1px solid ${(props) => props.theme.colors.borderColor};
    border-right:1px solid ${(props) => props.theme.colors.borderColor};
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => darken(0.1, props.theme.colors.secondaryLighter)};
    border-left:1px solid ${(props) => props.theme.colors.borderColor};
    border-right:1px solid ${(props) => props.theme.colors.borderColor}
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => darken(0.2, props.theme.colors.secondaryLighter)};
  }
`;
