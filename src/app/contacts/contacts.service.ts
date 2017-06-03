import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Contact, ContactState } from './contact';
import { CONTACTS } from './mock-contacts';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { ContactCommand, CreateContactCommand, DeleteContactCommand } from './contact/contact.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactsService {
  contactsUrl = environment.contactsUrl;
  contacts = new Array<Contact>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getContacts('').then(result => this.contacts = result as Array<Contact>);
  }

  createContact(doSave: boolean, name?: string): Contact {
    const newItem = new Contact();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.contacts.splice(0, 0, newItem);
      const createContactCommand = new CreateContactCommand(newItem);
      this.commandsService.postCommand(createContactCommand, false);
    }
    return newItem;
  }

  deleteContact(contact: Contact): void {
    const index = this.contacts.indexOf(contact, 0);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
    this.postCommand(new DeleteContactCommand(contact), false);
  }

  cloneContact(original: Contact): Contact {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getContacts(searchText: string): Promise<Array<Contact>> {
    if (this.contacts.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Contact>(this.contacts, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.contacts); }
    } else {
      return this.http.get(this.contactsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.contacts))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseResponse(response: any, contacts: Array<Contact>): Array<Contact> {
    const states = response.json() as Array<ContactState>;
    contacts = new Array<Contact>();
    for (const state of states) {
      contacts.push(new Contact(state));
    }
    return contacts;
  }

  getContact(guid: string): Promise<Contact> {
    // todo: try to always use local cache, so no single call in the future?
    if (this.contacts.length === 0) {
      this.getContacts('');
    }
    if (this.contacts.length > 0) {
      const result = _.find(this.contacts, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.contactsUrl + '/' + guid)
        .toPromise()
        .then(response => new Contact(response.json() as ContactState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: ContactCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
