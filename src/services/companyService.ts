import { ICompany } from "../types/company";

class CompanyService {
  public companies: ICompany[] = [];

  createCompany(data: ICompany): ICompany {
    const companyExists = this.companies.find(
      (company) => company.cnpj === data.cnpj
    );
    if (companyExists) {
      return data;
    }

    this.companies.push(data);

    return data;
  }

  getCompanies(): ICompany[] {
    return this.companies;
  }

  getCompanyById(data: { companyId: string }): ICompany | undefined {
    return this.companies.find((company) => company.id === data.companyId);
  }

  getCompanyByCnpj(data: { cnpj: string }): ICompany | undefined {
    return this.companies.find((company) => company.cnpj === data.cnpj);
  }
}

const companyService = new CompanyService();

export { companyService };
