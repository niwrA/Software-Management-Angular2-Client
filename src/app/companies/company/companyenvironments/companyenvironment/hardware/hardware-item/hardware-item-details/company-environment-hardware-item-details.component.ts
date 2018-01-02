import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../../../../../company';
import { CompanyEnvironment } from '../../../../companyenvironment';
import { CompanyEnvironmentHardwareItem } from '../../companyenvironmenthardware';
import { CompaniesService } from '../../../../../../companies.service';
import { RenameHardwareCommand, ChangeIPAddressForHardwareCommand } from '../../../../../company.commands';

@Component({
  selector: 'app-company-environment-hardware-item-details',
  templateUrl: './company-environment-hardware-item-details.component.html',
  styleUrls: ['./company-environment-hardware-item-details.component.css']
})
export class CompanyEnvironmentHardwareItemDetailsComponent implements OnInit {

  company: Company;
  companyenvironment: CompanyEnvironment;
  hardwareitem: CompanyEnvironmentHardwareItem;
  previoushardwareitem: CompanyEnvironmentHardwareItem;
  companyId: string;
  environmentId: string;
  hardwareId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['companyId'], params['environmentId'], params['hardwareId']])
      .subscribe(([companyId, environmentId, hardwareId]) => {
        this.getCompanyEnvironmentHardware(companyId, environmentId, hardwareId);
      });
  }

// this could be done directly from the company, but want to have the service decide on caching, when to retrieve what, etc. in the future?
  getCompanyEnvironmentHardware(companyId: string, environmentId: string, hardwareId: string): void {
    if (companyId && environmentId && hardwareId) {
      this.companyId = companyId;
      this.environmentId = environmentId;
      this.hardwareId = hardwareId;
      this.service.getCompanyEnvironmentHardware(companyId, environmentId, hardwareId).then(companyEnvironmentHardware => this.update(companyEnvironmentHardware));
      this.service.getCompany(companyId).then(company => this.company = company);
    }
  }
  update(newValue) {
    this.previoushardwareitem = this.service.cloneCompanyEnvironmentHardwareItem(newValue);
    this.hardwareitem = newValue;
  }
  changeName(): void {
    if (this.previoushardwareitem !== undefined) {
      if (this.hardwareitem.name !== this.previoushardwareitem.name) {
        const renameCommand = new RenameHardwareCommand(this.company, this.hardwareitem, this.previoushardwareitem.name);
        this.service.postCommand(renameCommand, false);
        this.previoushardwareitem.name = this.hardwareitem.name;
      }
    } else {
      this.previoushardwareitem = this.hardwareitem;
    }
  }
  changeIPAddress(): void {
    if (this.previoushardwareitem !== undefined) {
      if (this.hardwareitem.ipAddress !== this.previoushardwareitem.ipAddress) {
        const changeIpCommand = new ChangeIPAddressForHardwareCommand(this.company, this.hardwareitem, this.previoushardwareitem.ipAddress);
        this.service.postCommand(changeIpCommand, false);
        this.previoushardwareitem.ipAddress = this.hardwareitem.ipAddress;
      }
    } else {
      this.previoushardwareitem = this.hardwareitem;
    }
  }
}
