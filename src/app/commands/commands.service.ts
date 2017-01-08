import { Injectable } from '@angular/core';
import { Command } from './command';
import { UUID } from 'angular2-uuid';
@Injectable()
export class CommandsService {

  constructor() { }

  createCommand(name: string, entityName: string, entityGuid: string): Command {
    let command = new Command(name, entityName, entityGuid);
    command.CreateDate = new Date(); // todo: get UTC date, must be comparable globally to determine order of creation
    command.EntityGuid = entityGuid;
    command.EntityName = entityName;
    return command;
  }
}
