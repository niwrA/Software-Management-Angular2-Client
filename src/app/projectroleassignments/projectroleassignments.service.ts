import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { ProjectRoleAssignment, ProjectRoleAssignmentState } from './projectroleassignment';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  ProjectRoleAssignmentCommand, CreateProjectRoleAssignmentCommand,
  DeleteProjectRoleAssignmentCommand
} from './projectroleassignment/projectroleassignment.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact, ContactState } from '../contacts/contact';
import { ContactCardComponent } from '../contacts/contact/contact-card/contact-card.component';

@Injectable()
export class ProjectRoleAssignmentsService {
  projectroleassignmentsUrl = environment.projectroleassignmentsUrl;
  projectroleassignments = new Array<ProjectRoleAssignment>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getProjectRoleAssignments().then(result => this.projectroleassignments = result as Array<ProjectRoleAssignment>);
  }

  createProjectRoleAssignment(doSave: boolean, contactGuid: string, projectGuid: string, projectRoleGuid: string,
    post: boolean, contactName: string): ProjectRoleAssignment {
    const newItem = new ProjectRoleAssignment();
    newItem.guid = UUID.UUID();
    newItem.contactGuid = contactGuid;
    newItem.projectGuid = projectGuid;
    newItem.projectRoleGuid = projectRoleGuid;
    newItem.contactName = contactName;
    if (doSave) {
      this.projectroleassignments.splice(0, 0, newItem);
      if (post) {
        const createProjectRoleAssignmentCommand = new CreateProjectRoleAssignmentCommand(newItem);
        this.commandsService.postCommand(createProjectRoleAssignmentCommand, false);
      }
    }
    return newItem;
  }

  postProjectRoleAssignments(projectroleassignments: Array<ProjectRoleAssignment>) {
    var commands = new Array<ProjectRoleAssignmentCommand>();
    for (const projectroleassignment of projectroleassignments) {
      const createProjectRoleAssignmentCommand = new CreateProjectRoleAssignmentCommand(projectroleassignment);
      commands.push(createProjectRoleAssignmentCommand);
    }
    this.commandsService.postCommands(commands, false);
  }

  deleteProjectRoleAssignment(projectroleassignment: ProjectRoleAssignment): void {
    const index = this.projectroleassignments.indexOf(projectroleassignment, 0);
    if (index > -1) {
      this.projectroleassignments.splice(index, 1);
    }
    this.postCommand(new DeleteProjectRoleAssignmentCommand(projectroleassignment), false);
  }

  cloneProjectRoleAssignment(original: ProjectRoleAssignment): ProjectRoleAssignment {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  filterProjectRoleAssignments(projectroleassignments: Array<ProjectRoleAssignment>, projectRoleGuid?: string, contactGuid?: string) {
    if (projectRoleGuid !== null) {
      const results = _.filter<ProjectRoleAssignment>(projectroleassignments, prj => prj.projectRoleGuid === projectRoleGuid);
      return Promise.resolve(results);
    } else if (contactGuid !== null) {
      const results = _.filter<ProjectRoleAssignment>(projectroleassignments, prj => prj.contactGuid === contactGuid);
      return Promise.resolve(results);
    }
  }

  getProjectRoleAssignments(projectRoleGuid?: string, contactGuid?: string): Promise<Array<ProjectRoleAssignment>> {
    if (this.projectroleassignments.length > 0) {
      return this.filterProjectRoleAssignments(this.projectroleassignments, projectRoleGuid, contactGuid);
    } else {
      return this.http.get(this.projectroleassignmentsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.projectroleassignments))
        .then(projectroleassignments => this.filterProjectRoleAssignments(projectroleassignments, projectRoleGuid, contactGuid))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getContacts(projectRoleGuid): Promise<Array<Contact>> {
    return this.http.get(this.projectroleassignmentsUrl + '/getcontactsbyprojectroleid/' + projectRoleGuid)
      .toPromise()
      .then(response => this.parseContactsResponse(response))
      .catch(error => this.handleError(error, this.notificationService));
  }

  getContactsByProjectGuid(projectGuid): Promise<Array<Contact>> {
    return this.http.get(this.projectroleassignmentsUrl + '/getcontactsbyprojectid/' + projectGuid)
      .toPromise()
      .then(response => this.parseContactsResponse(response))
      .catch(error => this.handleError(error, this.notificationService));
  }

  parseContactsResponse(response: any): Array<Contact> {
    const states = response.json() as Array<ContactState>;
    let contacts = new Array<Contact>();
    for (const state of states) {
      contacts.push(new Contact(state));
    }
    return contacts;
  }

  parseResponse(response: any, projectroleassignments: Array<ProjectRoleAssignment>): Array<ProjectRoleAssignment> {
    const states = response.json() as Array<ProjectRoleAssignmentState>;
    projectroleassignments = new Array<ProjectRoleAssignment>();
    for (const state of states) {
      const projectroleassignment = new ProjectRoleAssignment(state);
      projectroleassignments.push(projectroleassignment);
      // this.projectroleassignments.push(projectroleassignment);
    }
    return projectroleassignments;
  }

  getProjectRoleAssignment(guid: string): Promise<ProjectRoleAssignment> {
    if (this.projectroleassignments.length > 0) {
      const result = _.find(this.projectroleassignments, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.projectroleassignmentsUrl + '/' + guid)
        .toPromise()
        .then(response => new ProjectRoleAssignment(response.json() as ProjectRoleAssignmentState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: ProjectRoleAssignmentCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
