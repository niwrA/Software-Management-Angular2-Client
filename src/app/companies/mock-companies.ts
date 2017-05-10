import { Company, CompanyState } from './company';
import { CompanyRoleState } from './company/companyroles/companyrole';
import { CompanyEnvironmentState } from './company/companyenvironments/companyenvironment';
export const COMPANIES: CompanyState[] = [
  { guid: 'company11', name: 'Nice Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company12', name: 'Narco Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company13', name: 'Bombasto Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company14', name: 'Celeritas Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company15', name: 'Magneta Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company16', name: 'RubberMan Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company17', name: 'Dynama Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company18', name: 'Dr IQ Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company19', name: 'Magma Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() },
  { guid: 'company20', name: 'Tornado Inc.', roles: new Array<CompanyRoleState>(), environments: new Array<CompanyEnvironmentState>() }
];

export class CompaniesServiceStub {
  companies: Array<Company> = new Array<Company>();
  constructor() {
    COMPANIES.forEach(element => {
      this.companies.push(new Company(element));
    });
  }
  getCompanies(searchText: string): Promise<Array<Company>> {
    return Promise.resolve(this.companies);
  };
  getCompany(guid: string): Promise<Company> {
    return Promise.resolve(this.companies.find(f => f.guid === guid));
  };
};
