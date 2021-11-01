import { baseTheme } from './base-theme';

const light = {
  title: 'light',
  ...baseTheme,

  colors: {
    primary: '#74b9ff',
    secondaryLighter: '#F2F3F5',
    secondary: '#DEE5E5',
    secondaryDarken: '#F2F3F5',
    white: '#f4ede8',
    textDark: '#242a2b',
    backgroundModal: 'rgba(0, 0, 0, 0.8)',
    shadow: 'rgba(0,0,0,0.3)',
    whiteTransparent: 'rgba(0, 0, 0, 0.1)',
    modalBorder: 'rgba(0,0,0,0.8)',
    info: '#0984e3',
    danger: '#e74c3c',
    success: '#2abb68',
    placeholder: '#6c7072',
    yellow: '#f1c40f',
    text: '#333',
    borderColor: 'rgba(51,51,51,0.1)',
  },
};

export { light };
