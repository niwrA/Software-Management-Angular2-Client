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
  @Input() canAdd: boolean;
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
    this.searchTextChanged();
    this.contactsService.getContacts(this.searchText).then(contacts => this.updateContacts(contacts));
  }

  filterContacts(): void {
    if (this.searchText && this.searchText.length > 0) {
      const filteredContacts = _.filter<Contact>(this.allContacts, prj => prj.name.indexOf(this.searchText) > -1);
      this.contacts = _.orderBy(filteredContacts, ['name'], ['asc']);
      // this.updateFilteredContacts(filteredContacts);
    } else { this.updateContacts(this.allContacts) }
    if (this.contacts.length === 0) {
      this.updateContacts(this.allContacts)
    }
  }

  updateFilteredContacts(contacts: Array<Contact>): void {
    this.contacts  = _.orderBy(contacts, ['name'], ['asc']);
    // filteredContacts.forEach(element => {
    //   this.contacts.push(element);
    // });
  }

  updateContacts(contacts: Array<Contact>): void {
    this.updateFilteredContacts(contacts);
    this.allContacts = contacts;
  }

  createContact(name: string): void {
    const contact = this.contactsService.createContact(true, name);
    this.contacts.push(contact);
    // todo: check if contacts points to allContacts
    this.allContacts.push(contact);
    this.filterContacts();
    //    this.getContacts();
  }

  deleteContact(contact: Contact): void {
    this.contactsService.deleteContact(contact);
    let index = this.contacts.indexOf(contact, 0);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
    // todo: also cleanup allcontacts, using filter on guid? Or do we directly link the service contacts for that?
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText && this.searchText.length > 0;
  }

  toggleSelect(contact: Contact): void {
    // contact.isSelected = !contact.isSelected;
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
