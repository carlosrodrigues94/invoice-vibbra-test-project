import React, { useCallback, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../../../components/button";
import { SimpleModal } from "../../../../components/modals";
import { IState } from "../../../../store";
import { ICompaniesState } from "../../../../store/modules/companies/types";
import {
  actionSetCloseModalRequest,
  actionSetShowModalRequest,
} from "../../../../store/modules/modals/actions";
import { IModalsState } from "../../../../store/modules/modals/types";
import { ICompany } from "../../../../types/company";
import { cnpjMask } from "../../../../utils/masks/cnpjMask";
import { modals } from "../../../../utils/modals";
import { ModalContent } from "./styles";

const ModalFindCompany: React.FC = () => {
  const dispatch = useDispatch();

  const [companyCnpj, setCompanyCnpj] = useState("");
  const [companyFound, setCompanyFound] = useState({} as ICompany);

  const { data: modalOpened } = useSelector<IState, IModalsState>(
    (state) => state.modals
  );

  const {
    data: { companies },
  } = useSelector<IState, ICompaniesState>((state) => state.companies);

  const handleFindCompanyByCnpj = () => {
    if (companyCnpj.length !== 18) {
      return toast.error("Ops.. Digite corretamente o CNPJ");
    }
    const cnpjWithoutMask = companyCnpj.replace(/\D/g, "");

    const company = companies.find((comp) => comp.cnpj === cnpjWithoutMask);

    if (!company) {
      return toast.info(
        "Ops.. Empresa não encontrada, você digitou corretamente o CNPJ?",
        { autoClose: 5000 }
      );
    }

    toast.success("Empresa encontrada!");

    setCompanyFound(company);
  };

  const handleChooseCompany = useCallback(() => {
    dispatch(actionSetShowModalRequest(modals.companyFound));
  }, [dispatch]);

  const handleCloseModalFindCompany = () => {
    dispatch(actionSetCloseModalRequest());
  };

  return (
    <SimpleModal
      headerText="Lançar uma nota"
      isOpen={modalOpened === modals.findCompany}
      buttonOkText="Buscar Empresa"
      buttonCancelText="Cancelar"
      onClickButtonOk={handleFindCompanyByCnpj}
      onClickButtonCancel={() => handleCloseModalFindCompany()}
    >
      <ModalContent>
        {companyFound.id && (
          <div className="company-found">
            <Button type="button" onClick={handleChooseCompany}>
              Empresa: {companyFound.socialName}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setCompanyFound({
                  cnpj: "",
                  id: "",
                  name: "",
                  socialName: "",
                  createdAt: new Date(),
                });
                setCompanyCnpj("");
              }}
            >
              <FaWindowClose />
            </Button>
          </div>
        )}

        {!companyFound.id && (
          <label htmlFor="input-cnpj">
            Digite o Cnpj da empresa
            <input
              name="input-cnpj"
              value={companyCnpj}
              maxLength={18}
              placeholder="CNPJ:"
              onChange={(event) => setCompanyCnpj(cnpjMask(event.target.value))}
              className="input-modal"
            />
          </label>
        )}
      </ModalContent>
    </SimpleModal>
  );
};

export default ModalFindCompany;
