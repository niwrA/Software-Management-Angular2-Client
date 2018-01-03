import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../company';
import { CompanyEnvironment } from '../../companyenvironment';
import { Account } from './account';
import { CompaniesService } from '../../../../companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import {
  AddAccountToEnvironmentCommand,
  RemoveAccountFromEnvironmentCommand
} from '../../../company.commands';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  private companyId: string;
  private environmentId: string;
  private company: Company;
  private companyenvironment: CompanyEnvironment;
  accounts: Array<Account>;
  canAdd: boolean;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) { }

  // todo: extract companyEnvironmentId to determine from which environment to get the account
  ngOnInit() {
    this.route.parent.params.map(params => [params['companyId'], params['environmentId']])
      .subscribe(([companyId, environmentId]) => {
        this.getCompanyEnvironment(companyId, environmentId);
      });
  }

  getCompanyEnvironment(companyId: string, environmentId: string): void {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.service.getCompanyEnvironment(companyId, environmentId)
        .then(companyEnvironment => this.updateCompanyEnvironment(companyEnvironment));
    }
  }

  updateCompanyEnvironment(companyEnvironment: CompanyEnvironment){
    this.companyenvironment = companyEnvironment;
    this.accounts = companyEnvironment.accounts;
    this.service.getCompany(companyEnvironment.companyGuid).then(company => this.company = company);
  }
  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
    this.getAccounts(this.searchText);
  }

  createAccount(name: string) {
    const account = new Account();
    account.guid = UUID.UUID();
    account.name = name;
    account.companyEnvironmentGuid = this.companyenvironment.guid;
    account.companyGuid = this.companyenvironment.companyGuid;

    this.companyenvironment.accounts.push(account);
    this.updateCompanyEnvironment(this.companyenvironment);

    const command = new AddAccountToEnvironmentCommand(this.company, account);
    this.service.postCommand(command, false);
  }

  deleteAccount(account: Account) {
    this.accounts.splice(this.accounts.indexOf(account));
    const command = new RemoveAccountFromEnvironmentCommand(this.company, account);
    this.service.postCommand(command, false);
  }

  getAccounts(searchText: string) {
    if (searchText && searchText.length > 0) {

      const results = _.filter<Account>(this.accounts, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.accounts);
  }
}
