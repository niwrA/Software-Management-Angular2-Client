import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyEnvironment } from '../../companyenvironment';
import { Company } from '../../../../company';
import { CompaniesService } from '../../../../companies.service';
import { RenameEnvironmentForCompanyCommand, ChangeUrlForEnvironmentForCompanyCommand } from '../../../company.commands';

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
    this.route.parent.params.map(params => [params['companyId'], params['environmentId']])
      .subscribe(([companyId, environmentId]) => {
        this.getCompanyEnvironment(companyId, environmentId);
      });
  }

  getCompanyEnvironment(companyId: string, environmentId: string): void {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      debugger;
      this.service.getCompanyEnvironment(companyId, environmentId)
        .then(companyEnvironment => this.updateCompanyEnvironment(companyEnvironment));
      this.service.getCompany(companyId).then(company => this.company = company);
    }
  }

  updateCompanyEnvironment(companyEnvironment: CompanyEnvironment): void {
    if (companyEnvironment) {
      this.companyenvironment = companyEnvironment;
      this.previousCompanyEnvironment = companyEnvironment.clone();
    }
  }

  changeName(): void {
    if (this.previousCompanyEnvironment !== undefined) {
      if (this.companyenvironment.name !== this.previousCompanyEnvironment.name) {
        const renameCommand = new RenameEnvironmentForCompanyCommand(this.company,
          this.companyenvironment, this.previousCompanyEnvironment.name);
        this.service.postCommand(renameCommand, false);
        this.previousCompanyEnvironment.name = this.companyenvironment.name;
      }
    } else {
      this.previousCompanyEnvironment = this.companyenvironment;
    }
  }

  changUrl(): void {
    if (this.previousCompanyEnvironment !== undefined) {
      if (this.companyenvironment.url !== this.previousCompanyEnvironment.url) {
        const changeUrlCommand = new ChangeUrlForEnvironmentForCompanyCommand(this.company,
          this.companyenvironment, this.previousCompanyEnvironment.url);
        this.service.postCommand(changeUrlCommand, false);
        this.previousCompanyEnvironment.name = this.companyenvironment.name;
      }
    } else {
      this.previousCompanyEnvironment = this.companyenvironment;
    }
  }
}
