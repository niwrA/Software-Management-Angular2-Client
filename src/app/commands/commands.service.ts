import { Injectable } from '@angular/core';
import { Command } from './command';
import { UUID } from 'angular2-uuid';
import { Headers, Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommandsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  commands = new Array<Command>();
  postedCommands = new Array<Command>();

  constructor(private http: Http, private notificationsService: NotificationsService) {
  };

  postCommand(command: Command, replaceOriginal: Boolean) {
    // todo: (optional) remove (some) duplicate commands, e.g. reschedule only needs the last one.
    command.Guid = UUID.UUID();
    command.ParametersJson = JSON.stringify(command.Parameters);
    this.commands.push(command);
    // todo: only non-processed commands and add a then that updates the commands / moves processed commands from this buffer
    // and any additional notifications about that something was saved.
    this.http.post('http://localhost:50274/api/eventsource/batch', JSON.stringify(this.commands),
      { headers: this.headers }).toPromise().then(results => this.processResults(results, command,
        this.commands, this.postedCommands, this.notificationsService))
        .catch(error=>this.handleError(error, this.notificationsService));
    //    this.commands = new Array<Command>();
  }
  private processResults(results: any, command: Command, commands: Array<Command>, postedCommands: Array<Command>, notificationService: NotificationsService) {
    console.log('project commands posted successfully', results);
    postedCommands.push(command);
    commands.splice(0);
    notificationService.success(command.DisplayProperties.title, command.DisplayProperties.description + ' posted successfully', {timeOut: 3000, clickToClose:true});
    // todo: handle command response properly (only move those that have been changed) 
  }
  handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); 
    notificationService.error('An error occurred',error, {timeOut: 5000, clickToClose:true});
    return Promise.reject(error.message || error);
  }
}
