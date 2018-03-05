import { Component, OnInit } from '@angular/core';
import { Company } from '../../company';
import { CompanyRole } from './companyrole';
import { CompaniesService } from '../../companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import { AddRoleToCompanyCommand, AddRoleToCompanyParameters, RemoveRoleFromCompanyCommand } from '../company.commands';

@Component({
  selector: 'app-companyroles',
  templateUrl: './companyroles.component.html',
  styleUrls: ['./companyroles.component.css']
})
export class CompanyRolesComponent implements OnInit {
  private company: Company;
  companyroles: Array<CompanyRole>;
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
    this.companyroles = company.roles;
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  createCompanyRole(name: string) {
    const companyrole = new CompanyRole();
    companyrole.guid = UUID.UUID();
    companyrole.name = name;
    companyrole.companyGuid = this.company.guid;

    this.company.roles.push(companyrole);
    this.updateCompany(this.company);

    const command = new AddRoleToCompanyCommand(this.company, companyrole);
    this.service.postCommand(command, false);
  }

  deleteCompanyRole(companyrole: CompanyRole) {
    this.companyroles.splice(this.companyroles.indexOf(companyrole));
    const command = new RemoveRoleFromCompanyCommand(this.company, companyrole);
    this.service.postCommand(command, false);
  }

  getCompanyRoles(searchText: string) {
    if (searchText && searchText.length > 0) {
      const results = _.filter<CompanyRole>(this.companyroles, prj => prj.name.toLowerCase().indexOf(searchText) > -1);
      this.companyroles = results;
    } else {
      this.companyroles = this.company.roles;
    }
  }
}
