import { Component, Input, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact';

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

  constructor(private contactsService: ContactsService) {
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

  getContacts(): void {
    this.contactsService.getContacts(this.searchText).then(contacts => this.contacts = contacts);
  }

  updateContacts(contacts: Array<Contact>): void {
    this.contacts = contacts;
  }

  createContact(name: string): void {
    const contact = this.contactsService.createContact(true, name);
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
