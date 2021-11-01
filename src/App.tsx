import React from "react";
import { Routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import SideBar from "./components/sidebar";
import { GlobalStyles } from "./styles/globals";
import { ToastContainer } from "react-toastify";
import { ThemeContextProvider } from "./contexts/theme-context";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ToastContainer />
        <GlobalStyles />
        <SideBar />
        <Routes />
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
