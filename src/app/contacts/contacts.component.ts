import { Component, Input, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact';
import * as _ from 'lodash';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  @Input() contacts = new Array<Contact>();
  @Input() allContacts = new Array<Contact>();
  @Input() selectedContacts = new Array<Contact>();
  @Input() canAdd: Boolean;
  selectedContact: Contact;
  searchText: string;

  constructor(private contactsService: ContactsService) {
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
    this.contactsService.getContacts(this.searchText).then(contacts => this.updateContacts(contacts));
  }

  filterContacts(): void {
    if (this.searchText && this.searchText.length > 0) {
      this.contacts = _.filter<Contact>(this.contacts, prj => prj.name.indexOf(this.searchText) > -1);
    } else { this.contacts = this.allContacts; }
    if(this.contacts.length === 0){
      this.contacts = this.allContacts;
    }
  }

  updateContacts(contacts: Array<Contact>): void {
    this.contacts = contacts;
    this.allContacts = contacts;
  }

  createContact(name: string): void {
    const contact = this.contactsService.createContact(true, name);
    this.contacts.push(contact);
    this.allContacts.push(contact);
    //    this.getContacts();
  }

  deleteContact(contact: Contact): void {
    this.contactsService.deleteContact(contact);
    const index = this.contacts.indexOf(contact, 0);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  toggleSelect(contact: Contact): void {
    //contact.isSelected = !contact.isSelected;
    if (!contact.isSelected) {
      this.selectedContacts.push(contact);
    } else {
      const index = this.selectedContacts.indexOf(contact, 0);
      if (index > -1) {
        this.selectedContacts.splice(index, 1);
      }
    }
  }
}
