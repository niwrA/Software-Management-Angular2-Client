import { Company, CompanyState } from './company';
import { CompanyRoleState } from './company/companyroles/companyrole';

export const COMPANIES: CompanyState[] = [
  { guid: 'company11', name: 'Nice Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company12', name: 'Narco Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company13', name: 'Bombasto Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company14', name: 'Celeritas Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company15', name: 'Magneta Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company16', name: 'RubberMan Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company17', name: 'Dynama Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company18', name: 'Dr IQ Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company19', name: 'Magma Inc.', companyRoles: new Array<CompanyRoleState>() },
  { guid: 'company20', name: 'Tornado Inc.', companyRoles: new Array<CompanyRoleState>() }
];

export class CompaniesServiceStub {
  companies: Array<Company> = new Array<Company>();
  constructor() {
    COMPANIES.forEach(element => {
      this.companies.push(new Company(element));
    });
  }
  getCompanys(searchText: string): Promise<Array<Company>> {
    return Promise.resolve(this.companies);
  };
  getCompany(guid: string): Promise<Company> {
    return Promise.resolve(this.companies.find(f => f.guid === guid));
  };
};
