import { Injectable } from '@angular/core';
import { Command } from './command';
import { UUID } from 'angular2-uuid';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommandsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  commands = new Array<Command>();
  postedCommands = new Array<Command>();

  constructor(private http: Http) { }

  // todo: move to commandservice?
  postCommand(command: Command, replaceOriginal: Boolean) {
    // todo: (optional) remove (some) duplicate commands, e.g. reschedule only needs the last one.
    command.Guid = UUID.UUID();
    command.ParametersJson = JSON.stringify(command.Parameters);
    this.commands.push(command);
    // todo: only non-processed commands and add a then that updates the commands / moves processed commands from this buffer
    // and any additional notifications about that something was saved.
    this.http.post('http://localhost:50274/api/commands/batch', JSON.stringify(this.commands),
      { headers: this.headers }).toPromise().then(this.processResults).catch(this.handleError);
    this.postedCommands.push(command);
    this.commands = new Array<Command>();
  }
  private processResults(results: any) {
    console.log('project commands posted successfully', results);
    // todo: handle command response properly (only move those that have been changed) 
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
