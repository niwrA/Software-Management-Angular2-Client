import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contact';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  _contactGuid: string;
  contact: Contact;
  @Input() set contactGuid(value: string) {
    this._contactGuid = value;
    this.service.getContact(value)
      .then(contact => this.updateContact(contact));
  };

  constructor(private service: ContactsService) { }

  ngOnInit() {
  }

  updateContact(contact: Contact) {
    this.contact = contact;
  }
}
