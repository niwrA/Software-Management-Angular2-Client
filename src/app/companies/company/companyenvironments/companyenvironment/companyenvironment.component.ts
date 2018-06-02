
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../../company';
import { CompanyEnvironment } from '../companyenvironment';
import { CompaniesService } from '../../../companies.service';
import { NavLink } from '../../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-companyenvironment',
  templateUrl: './companyenvironment.component.html',
  styleUrls: ['./companyenvironment.component.css']
})
export class CompanyEnvironmentComponent implements OnInit {
  company: Company;
  companyenvironment: CompanyEnvironment;
  companyId: string;
  environmentId: string;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('hardware', 'Hardware', false),
    new NavLink('databases', 'Databases', false),
    new NavLink('accounts', 'Accounts', false),
    new NavLink('software', 'Software', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getCompanyEnvironment(params.get('companyId'), params.get('environmentId')))
  }

// this could be done directly from the company, but want to have the service decide on caching, when to retrieve what, etc. in the future?
  getCompanyEnvironment(companyId: string, environmentId: string): void {
    if (companyId && environmentId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.service.getCompanyEnvironment(companyId, environmentId).then(companyEnvironment => this.companyenvironment = companyEnvironment);
      this.service.getCompany(companyId).then(company => this.company = company);
    }
  }
}
