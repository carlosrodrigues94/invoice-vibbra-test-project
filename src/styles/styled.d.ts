import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      readonly primary: string;
      readonly secondaryLighter: string;
      readonly secondary: string;
      readonly secondaryDarken: string;

      readonly white: string;
      readonly textDark: string;

      readonly backgroundModal: string;
      readonly shadow: string;

      readonly info: string;
      readonly danger: string;
      readonly yellow: string;
      readonly success: string;
      readonly placeholder: string;
      readonly whiteTransparent: string;
      readonly text: string;
      readonly modalBorder: string;
      readonly borderColor: string;
    };

    bounds: {
      headerMiddleHeight: string;

      borderRadius: string;
      headerBorderRadius: string;

      buttonWdMedium: string;
      buttonWdLarge: string;

      buttonHgMedium: string;
      buttonHgLarge: string;

      inputWdMedium: string;
      inputWdLarge: string;

      inputHgMedium: string;
      inputHgLarge: string;

      inputSearchWidth: string;

      selectWdMedium: string;
      selectWdLarge: string;

      selectHgMedium: string;
      selectHgLarge: string;

      headerModals: string;
    };
  }
}
