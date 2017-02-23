import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Employment, EmploymentState } from './employment';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { EmploymentCommand, CreateEmploymentCommand, DeleteEmploymentCommand } from './employment/employment.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class EmploymentsService {
  employmentsUrl = environment.employmentsUrl;
  employments = new Array<Employment>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getEmployments().then(result => this.employments = result as Array<Employment>);
  }

  createEmployment(doSave: boolean, contactGuid: string, companyRoleGuid: string): Employment {
    const newItem = new Employment();
    newItem.guid = UUID.UUID();
    newItem.contactGuid = contactGuid;
    newItem.companyRoleGuid = companyRoleGuid;
    if (doSave) {
      this.employments.splice(0, 0, newItem);
      const createEmploymentCommand = new CreateEmploymentCommand(newItem);
      this.commandsService.postCommand(createEmploymentCommand, false);
    }
    return newItem;
  }

  deleteEmployment(employment: Employment): void {
    const index = this.employments.indexOf(employment, 0);
    if (index > -1) {
      this.employments.splice(index, 1);
    }
    this.postCommand(new DeleteEmploymentCommand(employment), false);
  }

  cloneEmployment(original: Employment): Employment {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  filterEmployments(companyRoleGuid?: string, contactGuid?: string) {
    if (companyRoleGuid !== null) {
      const results = _.filter<Employment>(this.employments, prj => prj.companyRoleGuid === companyRoleGuid);
      return Promise.resolve(results);
    } else if (contactGuid !== null) {
      const results = _.filter<Employment>(this.employments, prj => prj.contactGuid === contactGuid);
      return Promise.resolve(results);
    }
  }

  getEmployments(companyRoleGuid?: string, contactGuid?: string): Promise<Array<Employment>> {
    if (this.employments.length > 0) {
      return this.filterEmployments(companyRoleGuid, contactGuid);
    } else {
      return this.http.get(this.employmentsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.employments))
        .then(employments => this.filterEmployments(companyRoleGuid, contactGuid))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseResponse(response: any, employments: Array<Employment>): Array<Employment> {
    const states = response.json() as Array<EmploymentState>;
    employments = new Array<Employment>();
    for (const state of states) {
      employments.push(new Employment(state));
    }
    return employments;
  }

  getEmployment(guid: string): Promise<Employment> {
    if (this.employments.length > 0) {
      const result = _.find(this.employments, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.employmentsUrl + '/' + guid)
        .toPromise()
        .then(response => new Employment(response.json() as EmploymentState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: EmploymentCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
