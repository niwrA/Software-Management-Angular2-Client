import { Injectable } from '@angular/core';
import { Command } from './command';
import { CommandBatchResult } from './commandbatchresult';
import { UUID } from 'angular2-uuid';
import { Headers, Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class CommandsService {
  private commandsUrl = environment.commandsUrl;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  commands = new Array<Command>();
  postedCommands = new Array<Command>();

  constructor(private http: Http, private notificationsService: NotificationsService) {
  };

  postCommands(commands: Array<Command>, replaceOriginal: Boolean): Promise<any> {
    for (const command of commands) {
      command.ParametersJson = JSON.stringify(command.Parameters);
      this.commands.push(command);
    }
    return this.postcommands(this.commands);
  }
  postCommand(command: Command, replaceOriginal: Boolean): Promise<any> {
    // todo: (optional) remove (some) duplicate commands, e.g. reschedule only needs the last one.
    command.ParametersJson = JSON.stringify(command.Parameters);
    this.commands.push(command);
    const currentCommands = new Array<Command>();
    currentCommands.push(command);
    return this.postcommands(currentCommands);
    // todo: only non-processed commands and add a then that updates the commands / moves processed commands from this buffer
    // and any additional notifications about that something was saved.
    //    this.commands = new Array<Command>();
  }
  private postcommands(commands: Array<Command>) {
    return this.http.post(this.commandsUrl, JSON.stringify(commands),
      { headers: this.headers }).toPromise().then(results => this.processResults(results,
        this.commands, this.postedCommands, this.notificationsService))
      .catch(error => this.handleError(error, this.notificationsService));
  }

  private processResults(results: any, commands: Array<Command>, postedCommands: Array<Command>,
    notificationService: NotificationsService) {
    const batchresult = results.json() as CommandBatchResult;
    if (batchresult.success) {
      console.log(batchresult.executedCommands.length + ' project command(s) posted successfully');
      for (const command of commands) {
        postedCommands.push(command);
        commands.splice(0);
        notificationService.success(command.DisplayProperties.title,
          command.DisplayProperties.description + ' posted successfully', { timeOut: 3000, clickToClose: true });
      }
    } else {
      notificationService.error('An error occurred', batchresult.message, { timeOut: 5000, clickToClose: true });
      // return Promise.reject(batchresult.message || batchresult);
    }
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('A connection error occurred', error);
    notificationService.error('A connection error occurred', error, { timeOut: 5000, clickToClose: true });
    return Promise.reject(error.message || error);
  }
}
