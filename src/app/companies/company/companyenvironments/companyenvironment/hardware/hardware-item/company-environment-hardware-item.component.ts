
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../../../../company';
import { CompanyEnvironment } from '../../../companyenvironment';
import { CompanyEnvironmentHardwareItem } from '../companyenvironmenthardware';
import { CompaniesService } from '../../../../../companies.service';
import { NavLink } from '../../../../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-company-environment-hardware-item',
  templateUrl: './company-environment-hardware-item.component.html',
  styleUrls: ['./company-environment-hardware-item.component.css']
})
export class CompanyEnvironmentHardwareItemComponent implements OnInit {

  company: Company;
  companyenvironment: CompanyEnvironment;
  hardwareitem: CompanyEnvironmentHardwareItem;
  companyId: string;
  environmentId: string;
  hardwareId: string;

  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getCompanyEnvironmentHardware(
      params.get('companyId'), params.get('environmentId'), params.get('hardwareId')))
  }

  // this could be done directly from the company, but want to have the service decide on caching,
  // when to retrieve what, etc. in the future?
  getCompanyEnvironmentHardware(companyId: string, environmentId: string, hardwareId: string): void {
    if (companyId && environmentId && hardwareId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.hardwareId = hardwareId;
      this.service.getCompanyEnvironmentHardware(companyId, environmentId, hardwareId)
        .then(companyEnvironmentHardware => this.hardwareitem = companyEnvironmentHardware);
      this.service.getCompany(companyId).then(company => this.company = company);
    }
  }
}
