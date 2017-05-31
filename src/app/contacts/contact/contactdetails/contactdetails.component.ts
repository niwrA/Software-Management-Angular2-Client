import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../../contact';
import {
  RenameContactCommand, ChangeBirthDateOfContactCommand
  , ChangeEmailForContactCommand, ChangeAvatarForContactCommand
} from '../contact.commands';
import { ContactsService } from '../../contacts.service';
import { File } from '../../../files/file';
import { FileUploadComponent } from '../../../file-upload/file-upload.component';

@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrls: ['./contactdetails.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  previousContact: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ContactsService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getContact(params['contactId']))
      .subscribe((contact: Contact) => this.update(contact));
  }

  update(newValue) {
    if (newValue) {
      this.previousContact = this.service.cloneContact(newValue);
      this.contact = newValue;
    }
  }

  changeName(): void {
    if (this.previousContact !== undefined) {
      if (this.contact.name !== this.previousContact.name) {
        const renameCommand = new RenameContactCommand(this.contact, this.previousContact.name);
        this.service.postCommand(renameCommand, false);
        this.previousContact.name = this.contact.name;
      }
    } else {
      this.previousContact = this.contact;
    }
  }

  changeEmail(): void {
    if (this.previousContact !== undefined) {
      if (this.contact.email !== this.previousContact.email) {
        const changeEmailCommand = new ChangeEmailForContactCommand(this.contact, this.previousContact.email);
        this.service.postCommand(changeEmailCommand, false);
        this.previousContact.email = this.contact.email;
      }
    } else {
      this.previousContact = this.contact;
    }
  }

  changeBirthDate(): void {
    if (this.contact.birthDate !== this.previousContact.birthDate) {
      const changeBirthDateForCommand = new ChangeBirthDateOfContactCommand(this.contact, this.previousContact.birthDate);
      this.service.postCommand(changeBirthDateForCommand, false);
      this.previousContact.birthDate = this.contact.birthDate;
    }
  }

  onFileUploaded(file: File) {
    if (file && file.guid) {
      // these were not linked to a model, so need to update them myself
      this.contact.avatarFileGuid = file.guid;
      this.contact.avatarUrl = file.url;

      // now on with the command
      const changeAvatarCommand = new ChangeAvatarForContactCommand(this.contact, this.previousContact.avatarFileGuid);
      this.service.postCommand(changeAvatarCommand, false);
      this.previousContact.avatarFileGuid = this.contact.avatarFileGuid;
      this.previousContact.avatarUrl = this.contact.avatarUrl;
    }
  }
}
