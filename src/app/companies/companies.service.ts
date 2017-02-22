import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Company, CompanyState } from './company';
import { CompanyRole } from './company/companyroles/companyrole';
import { COMPANIES } from './mock-companies';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { CompanyCommand, CreateCompanyCommand, DeleteCompanyCommand, RenameCompanyCommand } from './company/company.commands';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable()
export class CompaniesService {
  companiesUrl = environment.companiesUrl;
  companies = new Array<Company>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getCompanies('').then(result => this.companies = result as Array<Company>);
  }

  createCompany(doSave: boolean, name?: string): Company {
    const newItem = new Company;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.companies.splice(0, 0, newItem);
      const createCompanyCommand = new CreateCompanyCommand(newItem);
      this.commandsService.postCommand(createCompanyCommand, false);
    }
    return newItem;
  }

  deleteCompany(company: Company): void {
    const index = this.companies.indexOf(company, 0);
    if (index > -1) {
      this.companies.splice(index, 1);
    }
    this.postCommand(new DeleteCompanyCommand(company), false);
  }

  cloneCompany(original: Company): Company {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getCompanies(searchText: string): Promise<Array<Company>> {
    if (this.companies.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Company>(this.companies, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.companies); }
    } else {
      return this.http.get(this.companiesUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.companies))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getCompany(guid: string): Promise<Company> {
    if (this.companies.length > 0) {
      const result = _.find(this.companies, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.companiesUrl + '/' + guid)
        .toPromise()
        .then(response => response.json() as Company)
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseResponse(response: any, Companies: Array<Company>): Array<Company> {
    const states = response.json() as Array<CompanyState>;
    Companies = new Array<Company>();
    for (const state of states) {
      Companies.push(new Company(state));
    }
    return Companies;
  }

  postCommand(command: CompanyCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }

}
