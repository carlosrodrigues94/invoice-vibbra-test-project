import React, { useCallback, useEffect, useState } from "react";
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
import { addMoneyMask } from "../../../../utils/masks/moneyMask";
import { removeMask } from "../../../../utils/masks/removeMask";
import { modals } from "../../../../utils/modals";

import { ModalContent } from "./styles";
import { SelectMonth } from "components/select-month";
import { InputText } from "components/input-text";
import { DatePicker } from "components/date-picker";

type InvoiceDataState = Omit<IInvoice, "value" | "id">;

export type ModalEditInvoiceProps = {
  invoiceId: string;
};

const ModalEditInvoice: React.FC<ModalEditInvoiceProps> = ({ invoiceId }) => {
  const dispatch = useDispatch();

  const [newInvoiceData, setNewInvoiceData] = useState<InvoiceDataState>({
    dateReceived: new Date(),
    description: "",
    month: "",
    maskedValue: "",
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
      maskedValue: "",
    });
  }, []);

  const handleCancelEditInvoice = useCallback(() => {
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, clearFields]);

  const handleConfirmEditInvoice = useCallback(() => {
    const invoice = invoices.find((item) => item.id === invoiceId);

    const data = {
      ...invoice,
      ...newInvoiceData,
      value: removeMask(newInvoiceData.maskedValue) * 100,
    };

    const { dateReceived, description, month, maskedValue } = newInvoiceData;

    if (
      !dateReceived ||
      !description ||
      !month ||
      !Number(removeMask(maskedValue))
    ) {
      return toast.error("Ops... Digite corretamente os valores");
    }

    dispatch(actionUpdateInvoiceRequest(invoiceId, data));
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, invoiceId, newInvoiceData, invoices, clearFields]);

  useEffect(() => {
    const invoice = invoices.find((item) => item.id === invoiceId);

    if (!invoice) return;

    setNewInvoiceData((oldState) => ({
      dateReceived: oldState.dateReceived,
      description: invoice.description,
      maskedValue: invoice.maskedValue,
      month: invoice.month,
    }));
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
        <InputText
          title="Valor da Nota"
          placeholder="ex: R$ 95,90"
          value={newInvoiceData.maskedValue}
          onChange={({ target }) => {
            setNewInvoiceData({
              ...newInvoiceData,
              maskedValue: addMoneyMask(target.value),
            });
          }}
        />

        <InputText
          title="Descrição do serviço"
          placeholder="Descrição do serviço"
          value={newInvoiceData.description}
          onChange={(event) => {
            setNewInvoiceData({
              ...newInvoiceData,
              description: event.target.value,
            });
          }}
        />

        <DatePicker
          title="Data do recebimento"
          value={newInvoiceData.dateReceived}
          onChangeDate={(date) => {
            setNewInvoiceData({
              ...newInvoiceData,
              dateReceived: date,
            });
          }}
        />

        <SelectMonth
          title="Mês de competência"
          value={newInvoiceData.month}
          onChange={(event) => {
            setNewInvoiceData({
              ...newInvoiceData,
              month: event.target.value,
            });
          }}
        />
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalEditInvoice;
