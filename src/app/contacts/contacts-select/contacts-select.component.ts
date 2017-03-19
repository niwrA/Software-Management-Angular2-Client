import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogActions, MdDialogTitle, MdDialogContent } from '@angular/material';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-select',
  templateUrl: './contacts-select.component.html',
  styleUrls: ['./contacts-select.component.css']
})

export class ContactsSelectComponent {
  @Input() selectedContacts: Array<Contact> = new Array<Contact>();

  constructor(public dialogRef: MdDialogRef<ContactsSelectComponent>) {}

  confirm(): void {
    this.dialogRef.close(this.selectedContacts);
  }

  cancel(): void {
    this.selectedContacts = new Array<Contact>();
    this.dialogRef.close(new Array<Contact>());
  }

}
