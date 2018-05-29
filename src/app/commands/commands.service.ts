import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Command, CommandReadOnly, CommandState } from './command';
import { CommandBatchResult } from './commandbatchresult';
import { UUID } from 'angular2-uuid';
import { Headers, Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

import { environment } from '../../environments/environment';
import { User } from '../admin/users/user';
import { UsersService } from '../admin/users/users.service';

@Injectable()
export class CommandsService {
  private commandsUrl = environment.commandsUrl;
  private commandsReadOnlyUrl = environment.commandsReadOnlyUrl;
  private commandsExecuteNewUrl = environment.commandsExecuteNewUrl;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  commands = new Array<Command>();
  postedCommands = new Array<Command>();
  commandsReadOnly = new Array<CommandReadOnly>();

  constructor(private http: Http, private notificationsService: NotificationsService,
    private userService: UsersService) {
  };

  getCommandsForGuid(forGuid: string): Promise<Array<CommandReadOnly>> {
    return this.getCommands('').then(commands => this.filterByForGuid(commands, forGuid));
  }

  filterByForGuid(commands: Array<CommandReadOnly>, forGuid: string): Promise<Array<CommandReadOnly>> {
    if (forGuid && forGuid.length > 0) {
      const results = _.filter<CommandReadOnly>(commands, prj => prj.forGuid === forGuid);
      return Promise.resolve(results);
    } else { return Promise.resolve(commands); }

  }

  getCommands(searchText: string): Promise<Array<CommandReadOnly>> {
    if (this.commandsReadOnly.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<CommandReadOnly>(this.commandsReadOnly, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.commandsReadOnly); }
    } else {
      return this.http.get(this.commandsReadOnlyUrl)
        .toPromise()
        .then(response => this.parseResponseReadOnly(response, this.commandsReadOnly))
        .catch(error => this.handleError(error, this.notificationsService));
    }
  }

  parseResponseReadOnly(response: any, commands: Array<CommandReadOnly>): Array<CommandReadOnly> {
    const states = response.json() as Array<CommandState>;
    commands = new Array<CommandReadOnly>();
    // todo: option to add/update
    for (const state of states) {
      commands.push(new CommandReadOnly(state));
    }
    return commands;
  }
  postCommands(commands: Array<Command>, replaceOriginal: Boolean): Promise<any> {
    const username = this.userService.currentUserName;
    for (const command of commands) {
      command.UserName = username;
      command.ParametersJson = JSON.stringify(command.Parameters);
      this.commands.push(command);
    }
    return this.postcommands(this.commands);
  }
  postCommand(command: Command, replaceOriginal: Boolean): Promise<any> {
    // todo: (optional) remove (some) duplicate commands, e.g. reschedule only needs the last one.
    const username = this.userService.currentUserName;
    command.ParametersJson = JSON.stringify(command.Parameters);
    command.UserName = username;
    this.commands.push(command);
    const currentCommands = new Array<Command>();
    currentCommands.push(command);
    return this.postcommands(currentCommands);
    // todo: only non-processed commands and add a then that updates the commands / moves processed commands from this buffer
    // and any additional notifications about that something was saved.
    //    this.commands = new Array<Command>();
  }
  executeNew(): void {
    this.http.get(this.commandsExecuteNewUrl)
  }
  private postcommands(commands: Array<Command>) {
    return this.http.post(this.commandsUrl, JSON.stringify(commands),
      { headers: this.headers }).toPromise().then(results => this.processResults(results,
        this.commands, this.postedCommands, this.notificationsService))
      .catch(error => this.handleError(error, this.notificationsService));
  }

  private processResults(results: any, commands: Array<Command>, postedCommands: Array<Command>,
    notificationService: NotificationsService) {
    const batchresult: CommandBatchResult = results.json() as CommandBatchResult;
    if (batchresult.success) {
      console.log(batchresult.message);
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
