import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactsService
  ){}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getContact(params['contactId']))
    .subscribe((contact: Contact) => this.contact = contact);
  }

}
