import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { actionDeleteExpensesRequest } from "store/modules/expenses/actions";
import { IState } from "../../store";
import { IExpensesState } from "../../store/modules/expenses/types";
import { actionDeleteInvoiceRequest } from "../../store/modules/invoices/actions";
import { IInvoicesState } from "../../store/modules/invoices/types";
import { actionSetShowModalRequest } from "../../store/modules/modals/actions";
import { modals } from "../../utils/modals";
import ModalEditExpense from "./components/ModalEditExpense";
import ModalEditInvoice from "./components/ModalEditInvoice";

import { Container } from "./styles";

const History: React.FC = () => {
  const dispatch = useDispatch();

  const [invoiceId, setInvoiceId] = useState("");
  const [expenseId, setExpenseId] = useState("");

  const {
    data: { invoices },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const {
    data: { expenses },
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  const handleClickEditInvoice = useCallback(
    (id: string) => {
      setInvoiceId(id);
      dispatch(actionSetShowModalRequest(modals.editInvoice));
    },
    [dispatch]
  );

  const handleClickDeleteInvoice = useCallback(
    (id: string) => {
      dispatch(actionDeleteInvoiceRequest(id));
      toast.success("Nota excluida com sucesso!");
    },
    [dispatch]
  );

  const handleClickEditExpense = useCallback(
    (id: string) => {
      setExpenseId(id);
      dispatch(actionSetShowModalRequest(modals.editExpense));
    },
    [dispatch]
  );

  const handleClickDeleteExpense = useCallback(
    (id: string) => {
      dispatch(actionDeleteExpensesRequest(id));
      toast.success("Despesa excluida com sucesso!");
    },
    [dispatch]
  );

  return (
    <Container>
      <ModalEditInvoice invoiceId={invoiceId} />
      <ModalEditExpense expenseId={expenseId} />

      <h1>Histórico de Notas fiscais lançadas</h1>
      <ul>
        {invoices.map((invoice) => (
          <li>
            <p>{format(new Date(invoice.dateReceived), "dd/MM/yyyy")}</p>
            <b>{invoice.maskedValue}</b>
            <p>{invoice.description}</p>
            <button
              type="button"
              onClick={() => handleClickDeleteInvoice(invoice.id)}
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => handleClickEditInvoice(invoice.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      <h1>Histórico de Despesas lançadas</h1>
      <ul className="list-expenses">
        {expenses.map((expense) => (
          <li>
            <p>{format(new Date(expense.paymentDate), "dd/MM/yyyy")}</p>
            <b> - {expense.maskedValue}</b>
            <p>{expense.name}</p>
            <button
              type="button"
              onClick={() => handleClickDeleteExpense(expense.id)}
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => handleClickEditExpense(expense.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default History;
