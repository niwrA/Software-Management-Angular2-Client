import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyEnvironment } from '../../companyenvironment';
import { Company } from '../../../../company';
import { CompaniesService } from '../../../../companies.service';
import { RenameEnvironmentCommand, ChangeUrlForEnvironmentCommand } from '../../../company.commands';

@Component({
  selector: 'app-companyenvironmentdetails',
  templateUrl: './companyenvironmentdetails.component.html',
  styleUrls: ['./companyenvironmentdetails.component.css']
})
export class CompanyEnvironmentDetailsComponent implements OnInit {
  previousCompanyEnvironment: CompanyEnvironment;
  companyenvironment: CompanyEnvironment;
  company: Company;
  companyId: string;
  environmentId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => this.getCompanyEnvironment(params['companyId'], params['environmentId']));
  }

  getCompanyEnvironment(companyId: string, environmentId: string): Promise<CompanyEnvironment> {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.service.getCompany(companyId).then(company => this.company = company);
      return this.service.getCompanyEnvironment(companyId, environmentId)
        .then(companyEnvironment => this.updateCompanyEnvironment(companyEnvironment));
    }
  }

  updateCompanyEnvironment(companyEnvironment: CompanyEnvironment): CompanyEnvironment {
    if (companyEnvironment) {
      this.companyenvironment = companyEnvironment;
      this.previousCompanyEnvironment = companyEnvironment.clone();
    }
    return companyEnvironment;
  }

  changeName(): void {
    if (this.previousCompanyEnvironment !== undefined) {
      if (this.companyenvironment.name !== this.previousCompanyEnvironment.name) {
        const renameCommand = new RenameEnvironmentCommand(this.company,
          this.companyenvironment, this.previousCompanyEnvironment.name);
        this.service.postCommand(renameCommand, false);
        this.previousCompanyEnvironment.name = this.companyenvironment.name;
      }
    } else {
      this.previousCompanyEnvironment = this.companyenvironment;
    }
  }

  changeUrl(): void {
    if (this.previousCompanyEnvironment !== undefined) {
      if (this.companyenvironment.url !== this.previousCompanyEnvironment.url) {
        const changeUrlCommand = new ChangeUrlForEnvironmentCommand(this.company,
          this.companyenvironment, this.previousCompanyEnvironment.url);
        this.service.postCommand(changeUrlCommand, false);
        this.previousCompanyEnvironment.url = this.companyenvironment.url;
      }
    } else {
      this.previousCompanyEnvironment = this.companyenvironment;
    }
  }

  urlMissingHttp(): boolean {
    if (this.companyenvironment && this.companyenvironment.url && !this.companyenvironment.url.startsWith('http')) {
      return true;
    }
    return false;
  }
}
