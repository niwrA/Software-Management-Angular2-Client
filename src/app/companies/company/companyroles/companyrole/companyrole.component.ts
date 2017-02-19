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
    this.route.parent.params.switchMap((params: Params) => this.getCompany(params['companyId'], params['roleId']));
  }

  getCompany(guid: string, roleGuid: string): Promise<Company> {
    return this.service.getCompany(guid).then((company: Company) => this.update(company, roleGuid));
  }

  update(newValue: Company, roleGuid: string) {
    if (newValue) {
      this.company = newValue;
      this.companyrole = newValue.companyRoles.find(role => role.guid === roleGuid);
      this.previousCompanyRole = this.companyrole.clone();
    }
  }

  openDialog() {
    this.contactDialogRef = this.dialog.open(ContactsComponent, {
      height: '400px',
      width: '600px',
    });
    this.contactDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }

  handleSelected(ref) {
    this.selectedContacts = this.contactDialogRef.componentInstance.selectedContacts;
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
