import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Company } from './Company';
import { COMPANIES } from './mock-companies';
import * as _ from 'lodash';

@Injectable()

export class CompaniesService {

  companies = new Array<Company>();

  constructor() {
    this.companies = COMPANIES;
  }

  createCompany(): Company {
    let newItem = new Company;
    newItem.Guid = UUID.UUID();
    this.companies.splice(0, 0, newItem);
    return newItem;
  }

  getCompanies(searchText: string): Promise<Company[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<Company>(this.companies, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.companies);
  }

  getCompany(guid: string): Promise<Company> {
    return Promise.resolve(this.companies.find(f => f.Guid === guid));
  }
}
