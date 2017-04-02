import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ProjectRoleAssignmentsService } from './projectroleassignments.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectRoleAssignment } from './projectroleassignment';
import { ProjectRole } from '../projects/project/projectroles/projectrole';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactsSelectComponent } from '../contacts/contacts-select/contacts-select.component';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/contact';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as _ from 'lodash';


@Component({
  selector: 'app-projectroleassignments',
  templateUrl: './projectroleassignments.component.html',
  styleUrls: ['./projectroleassignments.component.css']
})
export class ProjectRoleAssignmentsComponent implements OnInit {
  contactDialogRef: MdDialogRef<ContactsSelectComponent>;
  projectroleassignments: Array<ProjectRoleAssignment>;
  selectedContacts: Array<Contact>;
  _projectroleguid: string;
  @Input()
  set projectroleguid(guid: string) {
    this._projectroleguid = guid;
    this.service.getProjectRoleAssignments(guid).then(projectroleassignments => this.updateProjectRoleAssignments(projectroleassignments));
  }
  get projectroleguid() { return this._projectroleguid; }
  @Input() contactguid: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectRoleAssignmentsService,
    private dialog: MdDialog,
    private contactsService: ContactsService
  ) {
  }

  ngOnInit() {
  }
  updateProjectRoleAssignments(projectroleassignments) {
    this.projectroleassignments = projectroleassignments;
  }
  selectContacts(projectrole: ProjectRole) {
    this.openContactsDialog();
  }
  openContactsDialog() {
    this.contactDialogRef = this.dialog.open(ContactsSelectComponent/*, {
      height: '400px',
      width: '600px',
    }*/);
    this.contactDialogRef.afterClosed().subscribe(test => this.handleSelected(test));
  }

  deleteProjectRoleAssignment(projectroleassignment: ProjectRoleAssignment) {
    this.service.deleteProjectRoleAssignment(projectroleassignment);
    let index = _.indexOf(this.projectroleassignments, projectroleassignment); // not sure this is safe
    if (index > -1) {
      this.projectroleassignments.splice(index, 1);
    }
  }

  handleSelected(ref) {
    let selectedContacts = this.contactDialogRef.componentInstance.selectedContacts;
    var projectroleassignments = new Array<ProjectRoleAssignment>();
    for (const selected of selectedContacts) {
      let exist = _.find(this.projectroleassignments, projectroleassignment => projectroleassignment.contactGuid === selected.guid);
      if (!exist) {
        var projectroleassignment = this.service.createProjectRoleAssignment(true, selected.guid, this.projectroleguid, false, selected.name);
        this.projectroleassignments.push(projectroleassignment);
        projectroleassignments.push(projectroleassignment);
      }
    }
    this.service.postProjectRoleAssignments(projectroleassignments);
  }

}
