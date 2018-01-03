import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../company';
import { CompanyEnvironment } from '../../companyenvironment';
import { Database } from './database';
import { CompaniesService } from '../../../../companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import {
  AddDatabaseToEnvironmentCommand,
  RemoveDatabaseFromEnvironmentCommand
} from '../../../company.commands';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.css']
})

export class DatabasesComponent implements OnInit {
  private companyId: string;
  private environmentId: string;
  private company: Company;
  private companyenvironment: CompanyEnvironment;
  databases: Array<Database>;
  canAdd: boolean;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) { }

  // todo: extract companyEnvironmentId to determine from which environment to get the database
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
    this.databases = companyEnvironment.databases;
    this.service.getCompany(companyEnvironment.companyGuid).then(company => this.company = company);
  }
  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
    this.getDatabases(this.searchText);
  }

  createCompanyEnvironmentDatabase(name: string) {
    const database = new Database();
    database.guid = UUID.UUID();
    database.name = name;
    database.companyEnvironmentGuid = this.companyenvironment.guid;
    database.companyGuid = this.companyenvironment.companyGuid;

    this.companyenvironment.databases.push(database);
    this.updateCompanyEnvironment(this.companyenvironment);

    const command = new AddDatabaseToEnvironmentCommand(this.company, database);
    this.service.postCommand(command, false);
  }

  deleteCompanyEnvironmentDatabase(database: Database) {
    this.databases.splice(this.databases.indexOf(database));
    const command = new RemoveDatabaseFromEnvironmentCommand(this.company, database);
    this.service.postCommand(command, false);
  }

  getDatabases(searchText: string) {
    if (searchText && searchText.length > 0) {

      const results = _.filter<Database>(this.databases, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.databases);
  }
}
