import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { DatePicker } from "../../../../components/date-picker";
import { InputText } from "../../../../components/input-text";
import { SimpleModal } from "../../../../components/modals";
import { SelectMonth } from "../../../../components/select-month";
import { IState } from "../../../../store";
import { actionStoreInvoiceRequest } from "../../../../store/modules/invoices/actions";
import { IInvoice } from "../../../../store/modules/invoices/types";
import { actionSetCloseModalRequest } from "../../../../store/modules/modals/actions";
import { IModalsState } from "../../../../store/modules/modals/types";
import { months } from "../../../../utils/months";
import { removeMask } from "../../../../utils/masks/removeMask";
import { addMoneyMask } from "../../../../utils/masks/moneyMask";
import { modals } from "../../../../utils/modals";
import { ModalContent } from "./styles";

type InvoiceDataState = Omit<IInvoice, "value" | "id">;

const ModalRegisterInvoice: React.FC = () => {
  const dispatch = useDispatch();

  const [invoiceData, setInvoiceData] = useState<InvoiceDataState>({
    maskedValue: "",
    description: "",
    month: months[0].shortName,
    dateReceived: new Date(),
  });

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const handleRegisterInvoice = useCallback(() => {
    const data: IInvoice = {
      dateReceived: invoiceData.dateReceived,
      month: invoiceData.month,
      maskedValue: invoiceData.maskedValue,
      value: removeMask(invoiceData.maskedValue) * 100,
      description: invoiceData.description,
      id: v4(),
    };

    const { dateReceived, description, month, maskedValue } = data;

    if (
      !dateReceived ||
      !description ||
      !month ||
      !Number(removeMask(maskedValue))
    ) {
      return toast.error("Ops... Digite corretamente os valores");
    }

    dispatch(actionStoreInvoiceRequest(data));
    dispatch(actionSetCloseModalRequest());

    toast.success("Nota lançada com sucesso!");

    setInvoiceData({
      dateReceived: new Date(),
      maskedValue: "",
      month: months[0].shortName,
      description: "",
    });
  }, [invoiceData, dispatch]);

  function handleCancelRegisterInvoice() {
    dispatch(actionSetCloseModalRequest());
  }

  return (
    <SimpleModal
      isOpen={modalOpened === modals.companyFound}
      buttonOkText="Cadastrar Nota"
      onClickButtonOk={handleRegisterInvoice}
      headerText="Cadastrar Nota"
      onClickButtonCancel={handleCancelRegisterInvoice}
    >
      <ModalContent>
        <InputText
          title="Valor da Nota"
          placeholder="ex: R$ 95,90"
          value={invoiceData.maskedValue}
          onChange={({ target }) => {
            setInvoiceData({
              ...invoiceData,
              maskedValue: addMoneyMask(target.value),
            });
          }}
        />

        <InputText
          title="Descrição"
          placeholder="ex: Manutenção"
          value={invoiceData.description}
          onChange={({ target }) => {
            setInvoiceData({
              ...invoiceData,
              description: target.value,
            });
          }}
        />

        <DatePicker
          value={invoiceData.dateReceived}
          onChangeDate={(date: Date) => {
            setInvoiceData({
              ...invoiceData,
              dateReceived: new Date(date),
            });
          }}
          title="Data de recebimento"
        />
        <SelectMonth
          title="Mês de competência"
          defaultValue={months[new Date().getMonth() + 1].shortName}
          value={invoiceData.month}
          onChange={(event) => {
            setInvoiceData({
              ...invoiceData,
              month: event.target.value,
            });
          }}
        />
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalRegisterInvoice;
