import { Contact, ContactState } from './contact';
export const CONTACTS: ContactState[] = [
  { guid: 'contact11', name: 'John Smith' },
  { guid: 'contact12', name: 'Jane Smith', email: 'jane@smith.com' },
  { guid: 'contact13', name: 'Mr. Nobody' },
  { guid: 'contact14', name: 'Sir James Bond Sr 3rd' },
  { guid: 'contact15', name: 'Neo' },
  { guid: 'contact16', name: 'Peter Parker' },
  { guid: 'contact17', name: 'Mrs Rodham-Clinton' },
  { guid: 'contact18', name: 'Estelle' },
  { guid: 'contact19', name: 'David' },
  { guid: 'contact20', name: 'Ms Maria Gomez' }
];

export class ContactsServiceStub {
  contacts: Array<Contact> = new Array<Contact>();
  constructor() {
    CONTACTS.forEach(element => {
      this.contacts.push(new Contact(element));
    });
  }
  getContacts(searchText: string): Promise<Array<Contact>> {
    return Promise.resolve(this.contacts);
  };
  getContact(guid: string): Promise<Contact> {
    return Promise.resolve(this.contacts.find(f => f.guid === guid));
  };
};
