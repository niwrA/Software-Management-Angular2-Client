import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Company, CompanyState } from './company';
import { CompanyEnvironment } from './company/companyenvironments/companyenvironment';
import { CompanyEnvironmentHardwareItem } from './company/companyenvironments/companyenvironment/hardware/companyenvironmenthardware';
import { Account } from './company/companyenvironments/companyenvironment/accounts/account';
import { Database } from './company/companyenvironments/companyenvironment/databases/database';
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
  cloneCompanyEnvironmentHardwareItem(original: CompanyEnvironmentHardwareItem): CompanyEnvironmentHardwareItem {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }
  cloneDatabase(original: Database): Database {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }
  cloneAccount(original: Account): Account {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }
  getCompanies(searchText: string): Promise<Array<Company>> {
    if (this.companies.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Company>(this.companies, prj =>
          ((prj.name && prj.name.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1)
            || (prj.code && prj.code.indexOf(searchText) > -1)
            || (prj.externalId && prj.externalId.indexOf(searchText) > -1)));
        // const sortedResults = _.sortBy(results, function (s) { return s.name; });
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
        .then(response => this.parseSingleResponse(response))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getCompanyEnvironment(companyGuid: string, environmentGuid: string): Promise<CompanyEnvironment> {
    if (companyGuid && environmentGuid) {
      const environment = this.getCompany(companyGuid)
        .then(company => _.find<CompanyEnvironment>(company.environments, t => t.guid === environmentGuid));
      return environment;
    }
  }
  getCompanyEnvironmentHardware(companyGuid: string, environmentGuid: string, hardwareGuid: string):
    Promise<CompanyEnvironmentHardwareItem> {
    if (companyGuid && environmentGuid && hardwareGuid) {
      const hardwareitem = this.getCompany(companyGuid)
        .then(company => _.find<CompanyEnvironment>(company.environments, t => t.guid === environmentGuid))
        .then(environment => _.find<CompanyEnvironmentHardwareItem>(environment.hardware, t => t.guid === hardwareGuid));
      return hardwareitem;
    }
  }
  getCompanyEnvironmentDatabase(companyGuid: string, environmentGuid: string, databaseGuid: string):
    Promise<Database> {
    if (companyGuid && environmentGuid && databaseGuid) {
      const hardwareitem = this.getCompany(companyGuid)
        .then(company => _.find<CompanyEnvironment>(company.environments, t => t.guid === environmentGuid))
        .then(environment => _.find<Database>(environment.databases, t => t.guid === databaseGuid));
      return hardwareitem;
    }
  }
  getCompanyEnvironmentAccount(companyGuid: string, environmentGuid: string, accountGuid: string):
    Promise<Account> {
    if (companyGuid && environmentGuid && accountGuid) {
      const hardwareitem = this.getCompany(companyGuid)
        .then(company => _.find<CompanyEnvironment>(company.environments, t => t.guid === environmentGuid))
        .then(environment => _.find<Account>(environment.accounts, t => t.guid === accountGuid));
      return hardwareitem;
    }
  }
  parseSingleResponse(response: any): Company {
    const state = response.json() as CompanyState;
    return new Company(state);
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
