import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleModal } from "../../components/modals";
import { IState } from "../../store";

import {
  actionSetCloseModalRequest,
  actionSetShowModalRequest,
} from "../../store/modules/modals/actions";

import { IModalsState, ModalData } from "../../store/modules/modals/types";
import { modals } from "../../utils/modals";
import { Container } from "./styles";
import ModalRegisterInvoice from "./components/ModalRegisterInvoice";
import ModalFindCompany from "./components/ModalFindCompany";
import ChartInvoicesRegisteredByMonth from "./components/ChartInvoicesRegisteredByMonth";
import ChartRevenuesLimits from "./components/ChartRevenuesLimits";
import ModalRegisterExpense from "./components/ModalRegisterExpense";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const handleOpenModal = useCallback(
    (data: ModalData) => {
      dispatch(actionSetShowModalRequest(data));
    },
    [dispatch]
  );

  const handleCloseModal = useCallback(() => {
    dispatch(actionSetCloseModalRequest());
  }, [dispatch]);

  return (
    <Container>
      <ModalRegisterExpense />
      <ModalFindCompany />
      <ModalRegisterInvoice />

      <button type="button" onClick={() => handleOpenModal(modals.findCompany)}>
        Lançar um nota Fiscal
      </button>
      <button
        type="button"
        onClick={() => handleOpenModal(modals.registerExpense)}
      >
        Lançar um Despesa
      </button>

      <ChartInvoicesRegisteredByMonth />
      <ChartRevenuesLimits />
    </Container>
  );
};

export { Home };
