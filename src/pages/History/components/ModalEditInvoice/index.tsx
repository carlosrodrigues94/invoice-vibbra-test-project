import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SimpleModal } from "../../../../components/modals";
import { IState } from "../../../../store";
import { actionUpdateInvoiceRequest } from "../../../../store/modules/invoices/actions";
import {
  IInvoice,
  IInvoicesState,
} from "../../../../store/modules/invoices/types";
import { actionSetCloseModalRequest } from "../../../../store/modules/modals/actions";
import { IModalsState } from "../../../../store/modules/modals/types";
import { months } from "../../../../utils";
import { addMoneyMask, removeMask } from "../../../../utils/masks";
import { modals } from "../../../../utils/modals";

import { ModalContent } from "./styles";

type InvoiceDataState = Omit<IInvoice, "valueUnmasked" | "id">;

export type ModalEditInvoiceProps = {
  invoiceId: string;
};

const ModalEditInvoice: React.FC<ModalEditInvoiceProps> = ({ invoiceId }) => {
  const dispatch = useDispatch();

  const [newInvoiceData, setNewInvoiceData] = useState<InvoiceDataState>({
    dateReceived: new Date(),
    description: "",
    month: "",
    value: "",
  });

  const {
    data: { invoices },
  } = useSelector<IState, IInvoicesState>((state) => state.invoices);

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const clearFields = useCallback(() => {
    setNewInvoiceData({
      dateReceived: new Date(),
      description: "",
      month: "",
      value: "",
    });
  }, []);

  const handleCancelEditInvoice = useCallback(() => {
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, clearFields]);

  const handleConfirmEditInvoice = useCallback(() => {
    const invoice = invoices.find((item) => item.id === invoiceId);

    const data = { ...invoice, ...newInvoiceData };

    const { dateReceived, description, month, value } = newInvoiceData;

    if (!dateReceived || !description || !month || !Number(removeMask(value))) {
      return toast.error("Ops... Digite corretamente os valores");
    }

    dispatch(actionUpdateInvoiceRequest(invoiceId, data));
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, invoiceId, newInvoiceData, invoices, clearFields]);

  useEffect(() => {
    const invoice = invoices.find((item) => item.id === invoiceId);

    if (!invoice) return;

    console.log("INVOICE => ", invoice.month);
    setNewInvoiceData({
      dateReceived: invoice.dateReceived,
      description: invoice.description,
      value: invoice.value,
      month: invoice.month,
    });
  }, [invoiceId, invoices]);

  return (
    <SimpleModal
      buttonOkText="Confirmar"
      headerText="Editar Nota"
      isOpen={modalOpened === modals.editInvoice}
      onClickButtonOk={handleConfirmEditInvoice}
      onClickButtonCancel={handleCancelEditInvoice}
    >
      <ModalContent>
        <label htmlFor="input-value-invoice">
          Valor da Nota
          <input
            placeholder="Valor da nota"
            value={newInvoiceData.value}
            onChange={({ target }) => {
              setNewInvoiceData({
                ...newInvoiceData,
                value: addMoneyMask(target.value),
              });
            }}
          />
        </label>

        <label htmlFor="input-description-invoice">
          Descrição do serviço
          <input
            placeholder="Descrição do serviço"
            value={newInvoiceData.description}
            onChange={(event) => {
              setNewInvoiceData({
                ...newInvoiceData,
                description: event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="input-date-invoice">
          Data do recebimento
          <input
            type="date"
            placeholder="Data de recebimento"
            value={
              new Date(newInvoiceData.dateReceived).toISOString().split("T")[0]
            }
            onChange={({ target }) => {
              setNewInvoiceData({
                ...newInvoiceData,
                dateReceived: new Date(target.value),
              });
            }}
          />
        </label>

        <label htmlFor="input-month-invoice">
          Mês de competência
          <select
            value={newInvoiceData.month}
            onChange={(event) => {
              setNewInvoiceData({
                ...newInvoiceData,
                month: event.target.value,
              });
            }}
          >
            <option disabled>Mês de Competência</option>
            {months.map((month) => (
              <option value={month.shortName}>{month.fullName}</option>
            ))}
          </select>
        </label>
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalEditInvoice;
