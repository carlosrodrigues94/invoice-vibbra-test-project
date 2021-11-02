import { useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetCloseSidebarRequest,
  actionSetToggleSidebarRequest,
} from "../../store/modules/sidebar/actions";
import { ButtonHamburger, Container } from "./styles";
import {
  FaMoon,
  FaBars,
  FaSun,
  FaRegSun,
  FaHistory,
  FaHome,
} from "react-icons/fa";
import { IState } from "../../store";
import { ThemeContext } from "../../contexts/theme-context";
import { ISidebarState } from "../../store/modules/sidebar/types";
import Switch from "react-switch";
import useOnClickOutside from "use-onclickoutside";
import { history } from "../../services/history";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();

  const { toggleTheme, theme } = useContext(ThemeContext);

  const { data: sidebar } = useSelector<IState, ISidebarState>(
    (state) => state.sidebar
  );

  const refSideBar = useRef<HTMLUListElement>(null);

  const handleCloseSidebar = useCallback(() => {
    if (!sidebar.isOpened) return;
    dispatch(actionSetCloseSidebarRequest());
  }, [dispatch, sidebar]);

  useOnClickOutside(refSideBar, handleCloseSidebar);

  const toggleSidebar = useCallback(() => {
    dispatch(actionSetToggleSidebarRequest());
  }, [dispatch]);

  return (
    <Container isOpen={sidebar.isOpened} ref={refSideBar}>
      <div className={"button-and-switch-container"}>
        <Switch
          checked={theme.title === "dark"}
          onChange={toggleTheme}
          className="switch-button"
          height={24}
          checkedIcon={<FaMoon className="icon-checked" fontSize={14} />}
          uncheckedIcon={<FaSun className="icon-unchecked" fontSize={14} />}
        />
        <ButtonHamburger type="button" onClick={toggleSidebar}>
          <FaBars />
        </ButtonHamburger>
      </div>
      <li onClick={() => history.push("/")}>
        <FaHome /> <span>Home</span>
      </li>
      <li onClick={() => history.push("/preferences")}>
        <FaRegSun /> <span>Preferencias</span>
      </li>
      <li onClick={() => history.push("/history")}>
        <FaHistory /> <span>Histórico de Lançamentos</span>
      </li>
    </Container>
  );
};

export default SideBar;
