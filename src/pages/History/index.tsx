import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IState } from "../../store";
import { IExpensesState } from "../../store/modules/expenses/types";
import { actionDeleteInvoiceRequest } from "../../store/modules/invoices/actions";
import { IInvoicesState } from "../../store/modules/invoices/types";
import { actionSetShowModalRequest } from "../../store/modules/modals/actions";
import { formatCurrency } from "../../utils/masks";
import { modals } from "../../utils/modals";
import ModalEditInvoice from "./components/ModalEditInvoice";

import { Container } from "./styles";

const History: React.FC = () => {
  const dispatch = useDispatch();
  const [invoiceId, setInvoiceId] = useState("");

  const {
    data: { invoices },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const {
    data: { expenses },
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  console.log(expenses);

  const handleClickEditInvoice = useCallback(
    (invoiceId: string) => {
      setInvoiceId(invoiceId);
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

  return (
    <Container>
      <ModalEditInvoice invoiceId={invoiceId} />
      <h1>Histórico de Notas fiscais lançadas</h1>
      <ul>
        {invoices.map((invoice) => (
          <li>
            <p>{format(new Date(invoice.dateReceived), "dd/MM/yyyy")}</p>
            <b>{invoice.value}</b>
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
            <b> - {formatCurrency(expense.value)}</b>
            <p>{expense.name}</p>
            <button
              type="button"
              onClick={() => handleClickDeleteInvoice(expense.id)}
            >
              Excluir
            </button>
            <button
              type="button"
              onClick={() => handleClickEditInvoice(expense.id)}
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
