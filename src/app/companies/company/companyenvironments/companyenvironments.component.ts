import { Component, OnInit } from '@angular/core';
import { Company } from '../../company';
import { CompanyEnvironment } from './companyenvironment';
import { CompaniesService } from '../../companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import {
  AddEnvironmentToCompanyCommand, AddEnvironmentToCompanyParameters,
  RemoveEnvironmentFromCompanyCommand
} from '../company.commands';

@Component({
  selector: 'app-companyenvironments',
  templateUrl: './companyenvironments.component.html',
  styleUrls: ['./companyenvironments.component.css']
})
export class CompanyEnvironmentsComponent implements OnInit {
  private company: Company;
  companyenvironments: Array<CompanyEnvironment>;
  canAdd: boolean;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getCompany(params['companyId']))
      .subscribe(company => this.updateCompany(company));
  }

  updateCompany(company: Company) {
    this.company = company;
    this.companyenvironments = company.environments;
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  createCompanyEnvironment(name: string) {
    const companyenvironment = new CompanyEnvironment();
    companyenvironment.guid = UUID.UUID();
    companyenvironment.name = name;
    companyenvironment.companyGuid = this.company.guid;

    this.company.environments.push(companyenvironment);
    this.updateCompany(this.company);

    const command = new AddEnvironmentToCompanyCommand(this.company, companyenvironment);
    this.service.postCommand(command, false);
  }

  deleteCompanyEnvironment(companyenvironment: CompanyEnvironment) {
    this.companyenvironments.splice(this.companyenvironments.indexOf(companyenvironment));
    const command = new RemoveEnvironmentFromCompanyCommand(this.company, companyenvironment);
    this.service.postCommand(command, false);
  }

  getCompanyEnvironments(searchText: string) {
    if (searchText && searchText.length > 0) {

      const results = _.filter<CompanyEnvironment>(this.companyenvironments, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.companyenvironments);
  }
}
