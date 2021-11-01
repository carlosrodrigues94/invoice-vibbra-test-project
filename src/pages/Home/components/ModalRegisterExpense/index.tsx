import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { SimpleModal } from "../../../../components/modals";
import { IState } from "../../../../store";
import { ICategoriesState } from "../../../../store/modules/categories/types";
import { ICompaniesState } from "../../../../store/modules/companies/types";
import { actionStoreExpenseeRequest } from "../../../../store/modules/expenses/actions";
import { IExpense } from "../../../../store/modules/expenses/types";
import { actionSetCloseModalRequest } from "../../../../store/modules/modals/actions";
import { IModalsState } from "../../../../store/modules/modals/types";
import { ICategory } from "../../../../types/category";
import { ICompany } from "../../../../types/company";
import { addMoneyMask, removeMask } from "../../../../utils/masks";
import { modals } from "../../../../utils/modals";
import { ModalContent, ContentInputs } from "./styles";

type IExpenseDataState = Omit<IExpense, "id" | "value"> & {
  maskedValue: string;
};

const ModalRegisterExpense: React.FC = () => {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");
  const [showCategoriesList, setShowCategoriesList] = useState(true);

  const [categorySelected, setCategorySelected] = useState({
    id: "",
    description: "",
    isArchived: false,
    name: "",
  } as ICategory);

  const [expenseData, setExpenseDate] = useState<IExpenseDataState>({
    maskedValue: "",
    categoryId: "",
    companyId: "",
    competenceDate: new Date(),
    name: "",
    paymentDate: new Date(),
  });

  const [companySelected, setCompanySelected] = useState<ICompany>({
    cnpj: "",
    createdAt: new Date(),
    id: "",
    name: "",
    socialName: "",
  });

  const {
    data: { categories },
  } = useSelector<IState, ICategoriesState>((state) => state.categories);

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const {
    data: { companies },
  } = useSelector<IState, ICompaniesState>((state) => state.companies);

  const handleChooseCategory = useCallback(
    (categoryId) => {
      const category = categories.find((item) => item.id === categoryId);

      if (!category) {
        return toast.error("Ops... Houve um erro ao buscar a categoria");
      }

      setShowCategoriesList(false);
      setExpenseDate((oldState) => ({ ...oldState, categoryId }));
      setCategorySelected(category);
    },
    [categories]
  );

  const handleCloseModalFindCompany = () => {
    dispatch(actionSetCloseModalRequest());
  };

  function filterCategories(array: ICategory[]) {
    return array.filter((category) => {
      const includesCategoryName = category.name
        .toLocaleLowerCase()
        .includes(categoryName);

      return includesCategoryName && categoryName.length > 2;
    });
  }

  const handleSelectCompany = useCallback(
    (companyId) => {
      const company = companies.find((item) => item.id === companyId);

      if (!company) {
        return toast.error("Ops.. houveu um erro ao escolher a empresa");
      }

      setCompanySelected(company);
      setExpenseDate((oldState) => ({ ...oldState, companyId: company.id }));
    },
    [companies]
  );

  const handleCloseModal = useCallback(() => {
    dispatch(actionSetCloseModalRequest());
    setExpenseDate((oldState) => ({
      ...oldState,
      companyId: oldState.companyId,
      competenceDate: new Date(),
      categoryId: "",
      name: "",
      maskedValue: "",
      paymentDate: new Date(),
    }));
    setCategoryName("");
    setShowCategoriesList(true);
  }, [dispatch]);

  const handleRegisterExpense = useCallback(() => {
    const valuesOk = Object.values(expenseData).every((value) => {
      return !!value === true;
    });

    if (!valuesOk || !Number(removeMask(expenseData.maskedValue))) {
      return toast.error(
        "Ops... preencha corretamente os campos para continuar"
      );
    }

    const data: IExpense = {
      ...expenseData,
      id: v4(),
      value: removeMask(expenseData.maskedValue),
      companyId: expenseData.companyId ?? companySelected.id,
    };

    dispatch(actionStoreExpenseeRequest(data));
    handleCloseModal();
  }, [dispatch, expenseData, companySelected, handleCloseModal]);

  useEffect(() => {
    if (companies.length !== 1) return;

    const [company] = companies;

    if (!company) return;

    setExpenseDate((oldState) => ({ ...oldState, companyId: company.id }));
  }, [companies]);

  return (
    <SimpleModal
      headerText="Cadastrar uma Despesa"
      isOpen={modalOpened === modals.registerExpense}
      buttonOkText="Cadastrar Despesa"
      buttonCancelText="Cancelar"
      onClickButtonOk={handleRegisterExpense}
      onClickButtonCancel={() => handleCloseModalFindCompany()}
    >
      <ModalContent>
        <label
          htmlFor="input-category-name"
          style={{ display: showCategoriesList ? "flex" : "none" }}
        >
          Digite o nome da Categoria
          <input
            name="input-category-name"
            value={categoryName}
            maxLength={18}
            placeholder="Nome:"
            onChange={(event) => {
              setCategoryName(event.target.value.toLocaleLowerCase());
            }}
          />
        </label>
        {filterCategories(categories).length > 0 && showCategoriesList && (
          <ul>
            <h4>Selecione uma Categoria</h4>

            {filterCategories(categories).map((category) => (
              <li key={category.id}>
                {category.name}{" "}
                <button
                  type="button"
                  onClick={() => handleChooseCategory(category.id)}
                >
                  Selecionar
                </button>
              </li>
            ))}
          </ul>
        )}
        <ContentInputs isOpen={!showCategoriesList}>
          {categorySelected.id && (
            <h4>Categoria Selecionada: {categorySelected.name}</h4>
          )}
          <label htmlFor="input-expense-name">
            Nome da Despesa
            <input
              name="input-expense-name"
              value={expenseData.name}
              maxLength={18}
              placeholder="Nome:"
              onChange={(event) => {
                setExpenseDate({ ...expenseData, name: event.target.value });
              }}
            />
          </label>

          <label htmlFor="input-expense-value">
            Valor da Despesa
            <input
              name="input-expense-value"
              value={expenseData.maskedValue}
              maxLength={18}
              placeholder="Nome:"
              onChange={(event) => {
                setExpenseDate({
                  ...expenseData,
                  maskedValue: addMoneyMask(event.target.value),
                });
              }}
            />
          </label>

          <label htmlFor="input-expense-date-receive">
            Data de recebimento
            <input
              type="date"
              name="input-expense-date-receive"
              placeholder="Data de recebimento"
              value={
                new Date(expenseData.paymentDate).toISOString().split("T")[0]
              }
              onChange={({ target }) => {
                setExpenseDate({
                  ...expenseData,
                  paymentDate: new Date(target.value),
                });
              }}
            />
          </label>
          <label htmlFor="input-expense-date-competence">
            Data de Competencia
            <input
              type="date"
              name="input-expense-date-competence"
              placeholder="Data de competência"
              value={
                new Date(expenseData.competenceDate).toISOString().split("T")[0]
              }
              onChange={({ target }) => {
                setExpenseDate({
                  ...expenseData,
                  competenceDate: new Date(target.value),
                });
              }}
            />
          </label>

          <label htmlFor="input-select-company">
            Selecione a empresa
            <select
              onChange={handleSelectCompany}
              value={expenseData.companyId}
              name="input-select-company"
            >
              <option disabled>Selecione a empresa</option>
              {companies.map((company) => (
                <option value={company.id} key={company.id}>
                  {company.socialName}
                </option>
              ))}
            </select>
          </label>
        </ContentInputs>
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalRegisterExpense;
