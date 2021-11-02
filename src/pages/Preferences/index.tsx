import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IState } from "../../store";
import {
  actionSetCloseModalRequest,
  actionSetShowModalRequest,
} from "../../store/modules/modals/actions";
import { IModalsState } from "../../store/modules/modals/types";
import { modals } from "../../utils/modals";
import { v4 as uuid } from "uuid";
import { Container } from "./styles";
import { SimpleModal } from "../../components/modals";
import { cnpjMask } from "../../utils/masks/cnpjMask";
import { actionStoreCompanyRequest } from "../../store/modules/companies/actions";
import { ICompaniesState } from "../../store/modules/companies/types";
import {
  actionArchiveCategoryRequest,
  actionStoreCategoryRequest,
} from "../../store/modules/categories/actions";
import { ICategory } from "../../types/category";
import { IConfigState } from "../../store/modules/config/types";
import {
  actionSetLimitValueRevenuesMEI,
  actionUpdateConfigAlertRevenues,
} from "../../store/modules/config/actions";
import { formatCurrency } from "../../utils/masks/moneyMask";
import { ICategoriesState } from "../../store/modules/categories/types";
import ReactSwitch from "react-switch";
import { Button } from "../../components/button";

const Preferences: React.FC = () => {
  const dispatch = useDispatch();

  const [companyCnpj, setCompanyCnpj] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySocialName, setCompanySocialName] = useState("");
  const [categoryData, setCategoryData] = useState({
    description: "",
    name: "",
  });

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const { data: config } = useSelector<IState, IConfigState>(
    (state) => state.config
  );

  const { data: companies } = useSelector<IState, ICompaniesState>(
    (state) => state.companies
  );

  const { data: categories } = useSelector<IState, ICategoriesState>(
    (state) => state.categories
  );

  const handleOpenModalRegisterCompany = useCallback(() => {
    dispatch(actionSetShowModalRequest(modals.registerCompany));
  }, [dispatch]);

  const handleRegisterCompany = useCallback(() => {
    if (companyCnpj.length !== 18) {
      return toast.error("Ops.. O Cnpj está inválido, digite um cnpj correto.");
    }

    if (!companyName || !companySocialName) {
      return toast.error(
        "Ops... Preencha todos os campos corretamente para continuar."
      );
    }

    const company = {
      cnpj: companyCnpj.replace(/\D/g, ""),
      createdAt: new Date(),
      id: uuid(),
      name: companyName,
      socialName: companySocialName,
    };

    const companyExists = companies.companies.find(
      (item) => item.cnpj === company.cnpj
    );

    if (companyExists) {
      return toast.warn("Ops.. essa empresa já existe.");
    }

    dispatch(actionStoreCompanyRequest(company));

    toast.success("Empresa cadastrada com sucesso!");

    setCompanyCnpj("");
    setCompanyName("");
    setCompanySocialName("");

    dispatch(actionSetCloseModalRequest());
  }, [companyCnpj, companySocialName, companyName, dispatch, companies]);

  const handleCancelRegisterCompany = useCallback(() => {
    setCompanyCnpj("");
    setCompanyName("");
    setCompanySocialName("");
    dispatch(actionSetCloseModalRequest());
  }, [dispatch]);

  const handleRegisterCategory = useCallback(() => {
    const category: ICategory = {
      ...categoryData,
      id: uuid(),
      isArchived: false,
    };

    dispatch(actionStoreCategoryRequest(category));

    dispatch(actionSetCloseModalRequest());

    setCategoryData({ name: "", description: "" });
  }, [dispatch, categoryData]);

  const handleOpenModalCategoryRegister = useCallback(() => {
    dispatch(actionSetShowModalRequest(modals.registerCategory));
  }, [dispatch]);

  const handleCancelRegisterCategory = useCallback(() => {
    setCategoryData({ description: "", name: "" });
    dispatch(actionSetCloseModalRequest());
  }, [dispatch]);

  const handleChangeLimitRevenue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const limitRevenue = Math.ceil(parseFloat(event.target.value)) * 100000;

      dispatch(actionSetLimitValueRevenuesMEI({ value: limitRevenue }));
    },
    [dispatch]
  );

  return (
    <Container>
      <SimpleModal
        onClickButtonOk={handleRegisterCompany}
        isOpen={modalOpened === modals.registerCompany}
        buttonOkText="Cadastrar"
        buttonCancelText="Cancelar"
        headerText="Cadastrar empresa"
        onClickButtonCancel={handleCancelRegisterCompany}
      >
        <div className="div-modal-content">
          <input
            className="input-modal"
            placeholder="Cnpj da Empresa"
            onChange={(event) => setCompanyCnpj(cnpjMask(event.target.value))}
            maxLength={18}
            value={companyCnpj}
          />
          <input
            className="input-modal"
            placeholder="Nome da empresa"
            onChange={(event) => setCompanyName(event.target.value)}
            value={companyName}
          />
          <input
            className="input-modal"
            placeholder="Razão social"
            value={companySocialName}
            onChange={(event) => setCompanySocialName(event.target.value)}
          />
        </div>
      </SimpleModal>

      {/** Register a New Category */}

      <SimpleModal
        onClickButtonOk={handleRegisterCategory}
        isOpen={modalOpened === modals.registerCategory}
        buttonOkText="Cadastrar"
        buttonCancelText="Cancelar"
        headerText="Cadastrar Categoria"
        onClickButtonCancel={handleCancelRegisterCategory}
      >
        <div className="div-modal-content">
          <input
            className="input-modal"
            placeholder="Nome da Categoria"
            onChange={(event) => {
              setCategoryData({ ...categoryData, name: event.target.value });
            }}
            value={categoryData.name}
          />
          <input
            className="input-modal"
            placeholder="Descrição"
            onChange={(event) => {
              setCategoryData({
                ...categoryData,
                description: event.target.value,
              });
            }}
            value={categoryData.description}
          />
        </div>
      </SimpleModal>

      {/** Limit Revenue */}

      <label htmlFor="limit-revenue" id="label-revenue">
        Modificar limite de faturamento MEI
        <input
          type="range"
          value={config.limitRevenuesMEI / 100_000}
          onChange={handleChangeLimitRevenue}
          max={config.limitRevenuesDefault / 100_000}
        />
        <span>{formatCurrency(config.limitRevenuesMEI / 100)}</span>
      </label>

      <Button type="button" onClick={handleOpenModalRegisterCompany}>
        Cadastrar Empresa Parceira
      </Button>
      <Button type="button" onClick={handleOpenModalCategoryRegister}>
        Cadastrar Categoria de Despesa
      </Button>

      {/** Config Send SMS, Email */}

      <ul>
        <h4>Configurar Alertas de Faturamento</h4>

        <li>
          Alerta de SMS
          <ReactSwitch
            height={20}
            width={45}
            className="switch"
            checked={config.revenuesAlerts.sendSms}
            onChange={(event) => {
              dispatch(
                actionUpdateConfigAlertRevenues({ sendSms: event.valueOf() })
              );
            }}
          />{" "}
        </li>
        <li>
          Alerta de Email
          <ReactSwitch
            height={20}
            width={45}
            className="switch"
            checked={config.revenuesAlerts.sendEmail}
            onChange={(event) => {
              dispatch(
                actionUpdateConfigAlertRevenues({ sendEmail: event.valueOf() })
              );
            }}
          />
        </li>
      </ul>

      {/** Categories */}

      <ul>
        <h4> Categorias</h4>
        {categories.categories
          .filter((category) => !category.isArchived)
          .map((category) => (
            <li key={category.id}>
              {category.name}{" "}
              <button
                type="button"
                onClick={() => {
                  dispatch(
                    actionArchiveCategoryRequest({ categoryId: category.id })
                  );
                }}
              >
                Arquivar
              </button>
            </li>
          ))}
      </ul>
    </Container>
  );
};

export { Preferences };
