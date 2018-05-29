import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../company';
import { CompanyEnvironment } from '../../companyenvironment';
import { CompanyEnvironmentHardwareItem } from './companyenvironmenthardware';
import { CompaniesService } from '../../../../companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import {
  AddHardwareToEnvironmentCommand,
  RemoveHardwareFromEnvironmentCommand
} from '../../../company.commands';

@Component({
  selector: 'app-company-environment-hardware',
  templateUrl: './company-environment-hardware.component.html',
  styleUrls: ['./company-environment-hardware.component.css']
})
export class CompanyEnvironmentHardwareComponent implements OnInit {
  private companyId: string;
  private environmentId: string;
  private company: Company;
  private companyenvironment: CompanyEnvironment;
  companyenvironmenthardware: Array<CompanyEnvironmentHardwareItem>;
  canAdd: boolean;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService
  ) { }

  // todo: extract companyEnvironmentId to determine from which environment to get the hardware
  ngOnInit() {
    this.route.paramMap.subscribe(params => this.getCompanyEnvironment(params.get('companyId'), params.get('environmentId')))
  }

  getCompanyEnvironment(companyId: string, environmentId: string): void {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.service.getCompanyEnvironment(companyId, environmentId)
        .then(companyEnvironment => this.updateCompanyEnvironment(companyEnvironment));
    }
  }

  updateCompanyEnvironment(companyEnvironment: CompanyEnvironment) {
    this.companyenvironment = companyEnvironment;
    this.companyenvironmenthardware = companyEnvironment.hardware;
    this.service.getCompany(companyEnvironment.companyGuid).then(company => this.company = company);
  }
  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
    this.getCompanyEnvironmentHardware(this.searchText);
  }

  createCompanyEnvironmentHardwareItem(name: string) {
    const hardware = new CompanyEnvironmentHardwareItem();
    hardware.guid = UUID.UUID();
    hardware.name = name;
    hardware.companyEnvironmentGuid = this.companyenvironment.guid;
    hardware.companyGuid = this.companyenvironment.companyGuid;

    this.companyenvironment.hardware.push(hardware);
    this.updateCompanyEnvironment(this.companyenvironment);

    const command = new AddHardwareToEnvironmentCommand(this.company, hardware);
    this.service.postCommand(command, false);
  }

  deleteCompanyEnvironmentHardwareItem(companyenvironmenthardware: CompanyEnvironmentHardwareItem) {
    this.companyenvironmenthardware.splice(this.companyenvironmenthardware.indexOf(companyenvironmenthardware));
    const command = new RemoveHardwareFromEnvironmentCommand(this.company, companyenvironmenthardware);
    this.service.postCommand(command, false);
  }

  getCompanyEnvironmentHardware(searchText: string) {
    if (searchText && searchText.length > 0) {

      const results = _.filter<CompanyEnvironmentHardwareItem>(this.companyenvironmenthardware, prj => prj.name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.companyenvironmenthardware);
  }
}
