import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {

  contacts = new Array<Contact>();
  selectedContact: Contact;
  searchText: string;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.getContacts('');
  }

  onSelect(company: Contact): void {
    this.selectedContact = company;
  }

  clearSelection(): void {
    this.selectedContact = null;
  }

  ContactDetail(event, Contact: Contact): void {
/*    event.stopPropagation();
    this.router.navigate(['/Contact', Contact.Guid]);
*/  }

  getContacts(searchText: string): void {
    this.contactsService.getContacts(searchText).then(contacts => this.contacts = contacts);
  }

  createContact(name: string): void {
    let contact = this.contactsService.createContact();
    contact.Name = name;
    this.searchText = '';
    this.getContacts('');
  }

}
