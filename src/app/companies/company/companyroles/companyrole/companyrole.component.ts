import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../../company';
import { CompanyRole } from '../companyrole';
import { RenameRoleForCompanyCommand } from '../../company.commands';
import { CompaniesService } from '../../../companies.service';
import { ContactsComponent } from '../../../../contacts/contacts.component';
import { ContactsService } from '../../../../contacts/contacts.service';
import { Contact } from '../../../../contacts/contact';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-companyrole',
  templateUrl: './companyrole.component.html',
  styleUrls: ['./companyrole.component.css']
})
export class CompanyRoleComponent implements OnInit {
  companyroleguid: string;
  companyrole: CompanyRole;
  company: Company;
  previousCompanyRole: CompanyRole;
  contactDialogRef: MdDialogRef<ContactsComponent>;
  selectedContacts: Array<Contact>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CompaniesService,
    private dialog: MdDialog,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => this.getCompany(params['companyId']));
    this.route.params.subscribe((params: Params) => this.getRole(params['roleId']));
  }

  getCompany(guid: string) {
    this.service.getCompany(guid).then((company: Company) => this.company = company).then(() => this.update());
  }
  getRole(guid: string) {
    this.companyroleguid = guid;
    this.update();
  }

  update() {
    if (this.company && this.companyroleguid) {
      this.companyrole = this.company.companyRoles.find(role => role.guid === this.companyroleguid);
      if (this.companyrole) {
        this.previousCompanyRole = this.companyrole.clone();
      }
    }
  }

  changeName(): void {
    if (this.previousCompanyRole !== undefined) {
      if (this.companyrole.name !== this.previousCompanyRole.name) {
        const renameCommand = new RenameRoleForCompanyCommand(this.company, this.companyrole, this.previousCompanyRole.name);
        this.service.postCommand(renameCommand, false);
        this.previousCompanyRole.name = this.companyrole.name;
      }
    } else {
      this.previousCompanyRole = this.companyrole;
    }
  }
}
