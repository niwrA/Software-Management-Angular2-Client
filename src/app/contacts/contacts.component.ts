import { Component, Input, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  @Input() contacts = new Array<Object>();
  @Input() canAdd: Boolean;
  selectedContact: Contact;
  searchText: string;

  constructor(private contactsService: ContactsService, private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
    this.contacts = contactsService.contacts;
   }

  ngOnInit() {
    this.getContacts();
  }

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
  }

  clearSelection(): void {
    this.selectedContact = null;
  }

  contactDetail(event, contact: Contact): void {
/*    event.stopPropagation();
    this.router.navigate(['/contact', contact.Guid]);
*/  }

  getContacts(): void {
    this.contactsService.getContacts(this.searchText).then(contacts => this.contacts = contacts);
  }

  updateContacts(contacts: Array<Contact>): void {
    this.contacts = contacts;
  }

  createContact(name: string): void {
    const contact = this.contactsService.createContact(true, name);
    // this.searchText = '';
    this.getContacts();
  }

  deleteContact(contact: Contact): void {
    this.contactsService.deleteContact(contact);
    this.contacts = this.contactsService.contacts;
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

}
