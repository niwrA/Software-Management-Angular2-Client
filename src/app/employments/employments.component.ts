import { Component, OnInit, Input } from '@angular/core';
import { CompaniesService } from '../companies/companies.service';
import { EmploymentsService } from './employments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Employment } from './employment';
import { CompanyRole } from '../companies/company/companyroles/companyrole';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsSelectComponent } from '../contacts/contacts-select/contacts-select.component';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as _ from 'lodash';


@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css']
})
export class EmploymentsComponent implements OnInit {
  contactDialogRef: MdDialogRef<ContactsSelectComponent>;
  employments: Array<Employment>;
  selectedContacts: Array<Contact>;
  _companyroleguid: string;
  @Input()
  set companyroleguid(guid: string) {
    this._companyroleguid = guid;
    this.service.getEmployments(guid).then(employments => this.updateEmployments(employments));
  }
  get companyroleguid() { return this._companyroleguid; }
  @Input() contactguid: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EmploymentsService,
    private dialog: MdDialog,
    private contactsService: ContactsService
  ) {
  }

  ngOnInit() {
  }
  updateEmployments(employments) {
    this.employments = employments;
  }
  selectContacts(companyrole: CompanyRole) {
    this.openContactsDialog();
  }
  openContactsDialog() {
    this.contactDialogRef = this.dialog.open(ContactsSelectComponent/*, {
      height: '400px',
      width: '600px',
    }*/);
    this.contactDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }
  
  deleteEmployment(employment: Employment)
  {
    this.service.deleteEmployment(employment);
    let index = _.indexOf(this.employments, employment); // not sure this is safe
    this.employments.splice(index);
  }

  handleSelected(ref) {
    let selectedContacts = this.contactDialogRef.componentInstance.selectedContacts;
    var employments = new Array<Employment>();
    for (const selected of selectedContacts) {
      let exist = _.find(this.employments, employment => employment.contactGuid === selected.guid);
      if (!exist) {
        var employment = this.service.createEmployment(true, selected.guid, this.companyroleguid, false, selected.name);
        this.employments.push(employment);
        employments.push(employment);
      }
    }
    this.service.postEmployments(employments);
  }

}
