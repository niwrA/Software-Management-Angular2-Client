import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Contact } from './contact';
import { CONTACTS } from './mock-contacts';
import * as _ from 'lodash';

@Injectable()
export class ContactsService {
contacts = new Array<Contact>();

  constructor() {
    this.contacts = CONTACTS;
  }

  createContact(): Contact {
    let newItem = new Contact;
    newItem.Guid = UUID.UUID();
    this.contacts.splice(0, 0, newItem);
    return newItem;
  }

  getContacts(searchText: string): Promise<Contact[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<Contact>(this.contacts, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.contacts);
  }

  getContact(guid: string): Promise<Contact> {
    return Promise.resolve(this.contacts.find(f => f.Guid === guid));
  }

}
