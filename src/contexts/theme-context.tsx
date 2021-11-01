import { createContext } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import useThemeStorage from "../hooks/use-theme-storage";
import { dark, light } from "../styles/themes";

export type ThemeContextProps = {
  toggleTheme: () => void;
  theme: DefaultTheme;
};

const ThemeContext = createContext({} as ThemeContextProps);

const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useThemeStorage<DefaultTheme>(dark);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
