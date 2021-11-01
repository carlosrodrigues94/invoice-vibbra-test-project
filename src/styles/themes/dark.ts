import { baseTheme } from './base-theme';

const dark = {
  title: 'dark',
  ...baseTheme,

  colors: {
    primary: '#74b9ff',
    secondaryLighter: '#68797d',
    secondary: '#2d3436',
    secondaryDarken: '#242a2b',
    white: '#f4ede8',
    textDark: '#242a2b',
    backgroundModal: 'rgba(0, 0, 0, 0.8)',
    shadow: 'rgba(0,0,0,0.3)',
    whiteTransparent: 'rgba(255,255,255,0.2)',
    modalBorder: 'rgba(255,255,255,0.2)',
    info: '#0984e3',
    danger: '#e74c3c',
    success: '#2abb68',
    placeholder: '#6c7072',
    text: '#f4ede8',
    yellow: '#f1c40f',
    borderColor: 'rgba(244, 237, 232, 0.09)',
  },
};

export { dark };
