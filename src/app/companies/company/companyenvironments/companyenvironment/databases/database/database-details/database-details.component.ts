
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../../../../../company';
import { CompanyEnvironment } from '../../../../companyenvironment';
import { Database } from '../../database';
import { CompaniesService } from '../../../../../../companies.service';
import { RenameDatabaseCommand } from '../../../../../company.commands';

@Component({
  selector: 'app-database-details',
  templateUrl: './database-details.component.html',
  styleUrls: ['./database-details.component.css']
})
export class DatabaseDetailsComponent implements OnInit {

  company: Company;
  companyenvironment: CompanyEnvironment;
  database: Database;
  previousdatabase: Database;
  companyId: string;
  environmentId: string;
  databaseId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getCompanyEnvironmentDatabase(
      params.get('companyId'), params.get('environmentId'), params.get('databaseId')))
  }

  // this could be done directly from the company, but want to have the service decide on caching,
  // when to retrieve what, etc. in the future?
  getCompanyEnvironmentDatabase(companyId: string, environmentId: string, databaseId: string): void {
    if (companyId && environmentId && databaseId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.databaseId = databaseId;
      this.service.getCompanyEnvironmentDatabase(companyId, environmentId, databaseId)
        .then(companyEnvironmentDatabase => this.update(companyEnvironmentDatabase));
      this.service.getCompany(companyId).then(company => this.company = company);
    }
  }
  update(newValue) {
    this.previousdatabase = this.service.cloneDatabase(newValue);
    this.database = newValue;
  }
  changeName(): void {
    if (this.previousdatabase !== undefined) {
      if (this.database.name !== this.previousdatabase.name) {
        const renameCommand = new RenameDatabaseCommand(this.company, this.database, this.previousdatabase.name);
        this.service.postCommand(renameCommand, false);
        this.previousdatabase.name = this.database.name;
      }
    } else {
      this.previousdatabase = this.database;
    }
  }
}
