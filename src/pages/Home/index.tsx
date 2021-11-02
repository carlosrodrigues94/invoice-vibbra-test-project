import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { actionSetShowModalRequest } from "../../store/modules/modals/actions";

import { ModalData } from "../../store/modules/modals/types";
import { modals } from "../../utils/modals";
import { Container } from "./styles";
import ModalRegisterInvoice from "./components/ModalRegisterInvoice";
import ModalFindCompany from "./components/ModalFindCompany";
import ChartInvoicesRegisteredByMonth from "./components/ChartInvoicesRegisteredByMonth";
import ChartRevenuesLimits from "./components/ChartRevenuesLimits";
import ModalRegisterExpense from "./components/ModalRegisterExpense";
import ChartExpensesRegisteredByMonth from "./components/ChartExpensesRegisteredByMonth";
import ChartInvoicesAndExpensesByMonth from "./components/ChartInvoicesAndExpensesByMonth";
import ChartExpensesRegisteredByCategory from "./components/ChartExpensesRegisteredByCategory";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleOpenModal = useCallback(
    (data: ModalData) => {
      dispatch(actionSetShowModalRequest(data));
    },
    [dispatch]
  );

  return (
    <Container>
      <ModalRegisterExpense />
      <ModalFindCompany />
      <ModalRegisterInvoice />

      <main className="main-header">
        <button
          className="button-register"
          type="button"
          onClick={() => handleOpenModal(modals.findCompany)}
        >
          Lançar um nota Fiscal
        </button>
        <button
          className="button-register"
          type="button"
          onClick={() => handleOpenModal(modals.registerExpense)}
        >
          Lançar um Despesa
        </button>
      </main>

      <div className="content-charts">
        <ChartInvoicesRegisteredByMonth />
        <ChartExpensesRegisteredByMonth />
        <ChartInvoicesAndExpensesByMonth />
        <ChartExpensesRegisteredByCategory />
        <ChartRevenuesLimits />
      </div>
    </Container>
  );
};

export { Home };
