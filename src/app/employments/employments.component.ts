import { Component, OnInit, Input } from '@angular/core';
import { CompaniesService } from '../companies/companies.service';
import { EmploymentsService } from './employments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Employment} from './employment';
import { CompanyRole } from '../companies/company/companyroles/companyrole';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact';
import { MdDialog, MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css']
})
export class EmploymentsComponent implements OnInit {
  contactDialogRef: MdDialogRef<ContactsComponent>;
  selectedContacts: Array<Contact>;
  @Input() companyroleguid: string;
  @Input() contactguid: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmploymentsService,
    private dialog: MdDialog,
    private contactsService: ContactsService
  ) {
    this.service.getEmployments(this.companyroleguid, this.contactguid)
  }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getEmployments(params['companyRoleId'], params['contactId']))
      .subscribe(employments => this.updateEmployments(employments));
  }
  updateEmployments(employments) {

  }
  selectContacts(companyrole: CompanyRole) {
    this.openContactsDialog();
  }
  openContactsDialog() {
    this.contactDialogRef = this.dialog.open(ContactsComponent, {
      height: '400px',
      width: '600px',
    });
    this.contactDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }

  handleSelected(ref) {
    this.selectedContacts = this.contactDialogRef.componentInstance.selectedContacts;
    var employments = new Array<Employment>();
    for (const selected of this.selectedContacts) {
      var employment = this.service.createEmployment(true, selected.guid, this.companyroleguid, false);
      employments.push(employment);
    }
    this.service.postEmployments(employments);
  }

}
