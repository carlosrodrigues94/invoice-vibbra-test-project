import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SimpleModal } from "../../../../components/modals";
import { IState } from "../../../../store";
import { actionSetCloseModalRequest } from "../../../../store/modules/modals/actions";
import { IModalsState } from "../../../../store/modules/modals/types";
import { addMoneyMask } from "../../../../utils/masks/moneyMask";
import { removeMask } from "../../../../utils/masks/removeMask";
import { modals } from "../../../../utils/modals";

import { ModalContent } from "./styles";
import { IExpense, IExpensesState } from "store/modules/expenses/types";
import { InputText } from "components/input-text";
import { DatePicker } from "components/date-picker";
import { actionUpdateExpensesRequest } from "store/modules/expenses/actions";

type ExpenseDataState = Omit<IExpense, "value" | "id">;

export type ModalEditExpenseProps = {
  expenseId: string;
};

const ModalEditExpense: React.FC<ModalEditExpenseProps> = ({ expenseId }) => {
  const dispatch = useDispatch();

  const [newExpenseData, setNewExpenseData] = useState<ExpenseDataState>({
    categoryId: "",
    companyId: "",
    competenceDate: new Date(),
    name: "",
    paymentDate: new Date(),
    maskedValue: "",
  });

  const {
    data: { expenses },
  } = useSelector<IState, IExpensesState>((state) => state.expenses);

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const clearFields = useCallback(() => {
    setNewExpenseData({
      categoryId: "",
      companyId: "",
      competenceDate: new Date(),
      name: "",
      paymentDate: new Date(),
      maskedValue: "",
    });
  }, []);

  const handleCancelEditExpense = useCallback(() => {
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, clearFields]);

  const handleConfirmEditExpense = useCallback(() => {
    const expense = expenses.find((item) => item.id === expenseId);

    const data = {
      ...expense,
      ...newExpenseData,
      value: removeMask(newExpenseData.maskedValue) * 100,
    };

    const {
      paymentDate,
      categoryId,
      name,
      competenceDate,
      companyId,
      maskedValue,
    } = newExpenseData;

    if (
      !paymentDate ||
      !categoryId ||
      !name ||
      !competenceDate ||
      !companyId ||
      !Number(removeMask(maskedValue))
    ) {
      return toast.error("Ops... Digite corretamente os valores");
    }

    dispatch(actionUpdateExpensesRequest(expenseId, data));
    dispatch(actionSetCloseModalRequest());
    clearFields();
  }, [dispatch, expenseId, newExpenseData, expenses, clearFields]);

  useEffect(() => {}, [expenseId, expenses, modalOpened]);

  useLayoutEffect(() => {
    const expense = expenses.find((item) => item.id === expenseId);

    if (!expense) return;

    if (!expenses.length) return;

    if (modalOpened !== modals.editExpense) return;

    setNewExpenseData((oldState) => ({
      ...oldState,
      companyId: expense.companyId,
      name: expense.name,
      maskedValue: expense.maskedValue,
      categoryId: expense.categoryId,
    }));
  }, [expenseId, expenses, modalOpened]);

  return (
    <SimpleModal
      buttonOkText="Confirmar"
      headerText="Editar Despesa"
      isOpen={modalOpened === modals.editExpense}
      onClickButtonOk={handleConfirmEditExpense}
      onClickButtonCancel={handleCancelEditExpense}
    >
      <ModalContent>
        <InputText
          title="Valor da Despesa"
          placeholder="ex: R$ 95,90"
          value={newExpenseData.maskedValue}
          onChange={({ target }) => {
            setNewExpenseData({
              ...newExpenseData,
              maskedValue: addMoneyMask(target.value),
            });
          }}
        />

        <InputText
          title="Nome da despesa"
          placeholder="Gasto com imóvel"
          value={newExpenseData.name}
          onChange={(event) => {
            setNewExpenseData({
              ...newExpenseData,
              name: event.target.value,
            });
          }}
        />

        <DatePicker
          title="Data de pagamento"
          value={newExpenseData.paymentDate}
          onChangeDate={(date) => {
            setNewExpenseData({
              ...newExpenseData,
              paymentDate: date,
            });
          }}
        />

        <DatePicker
          title="Data de competência"
          value={newExpenseData.competenceDate}
          onChangeDate={(date) => {
            setNewExpenseData({
              ...newExpenseData,
              competenceDate: date,
            });
          }}
        />
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalEditExpense;
