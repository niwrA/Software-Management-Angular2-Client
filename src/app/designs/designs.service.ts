import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Design, DesignState } from './design';
import { EpicElement } from './design/epic-elements/epic-element';
import { EntityElement } from './design/entity-elements/entity-element';
import { PropertyElement } from './design/property-elements/property-element';
import { CommandElement } from './design/command-elements/command-element';
import { DESIGNS } from './mock-designs';
import { Command } from '../commands/command';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  DesignCommand, CreateDesignCommand, DeleteDesignCommand,
  RenameDesignCommand, AddChildToEntityElementCommand, RemoveChildFromEntityElementCommand
} from './design/design.commands';
import { CreateEntityElementCommand } from './design/entity-elements/entity-element/entity-element.commands';
import {
  CreatePropertyElementCommand, CreatePropertyCodeGenCommand, DeletePropertyElementCommand
} from './design/property-elements/property-element/property-element.commands';
import { CreateEpicElementCommand } from './design/epic-elements/epic-element/epic-element.commands';
import { CreateCommandElementCommand } from './design/command-elements/command-element/command-element.commands';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable()
export class DesignsService {
  designsUrl = environment.designsUrl;
  designs = new Array<Design>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getDesigns('').then(result => this.designs = result as Array<Design>);
  }

  createDesign(doSave: boolean, name?: string): Design {
    const newItem = new Design();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      this.designs.splice(0, 0, newItem);
      const createDesignCommand = new CreateDesignCommand(newItem);
      this.commandsService.postCommand(createDesignCommand, false);
    }
    return newItem;
  }

  createEpicElement(doSave: boolean, design: Design, name?: string): EpicElement {
    const newItem = new EpicElement();
    newItem.guid = UUID.UUID();
    newItem.designGuid = design.guid;
    newItem.name = name;
    if (doSave) {
      design.epics.push(newItem);
      const createDesignCommand = new CreateEpicElementCommand(newItem);
      this.commandsService.postCommand(createDesignCommand, false);
    }
    return newItem;
  }
  createEntityElement(doSave: boolean, epic: EpicElement, name?: string): EntityElement {
    const newItem = new EntityElement();
    newItem.guid = UUID.UUID();
    newItem.designGuid = epic.designGuid;
    newItem.epicGuid = epic.guid;
    newItem.name = name;
    if (doSave) {
      epic.entities.push(newItem);
      const createEntityCommand = new CreateEntityElementCommand(newItem);
      this.commandsService.postCommand(createEntityCommand, false);
    }
    return newItem;
  }

  createEntityElementChild(doSave: boolean, epicElement: EpicElement, parent: EntityElement, name: string): EntityElement {
    const newItem = new EntityElement();
    newItem.guid = UUID.UUID();
    newItem.name = name;
    newItem.parentGuid = parent.guid;
    newItem.epicGuid = parent.epicGuid;
    newItem.designGuid = parent.designGuid;
    if (doSave) {
      epicElement.entities.push(newItem);
      const createEpicElementConfigCommand = new AddChildToEntityElementCommand(newItem);
      this.commandsService.postCommand(createEpicElementConfigCommand, false);
    }
    return newItem;
  }
  removeChildFromEntityElement(epicElement: EpicElement, entityelement: EntityElement, parent: EntityElement): void {
    const index = epicElement.entities.indexOf(entityelement, 0);
    if (index > -1) {
      epicElement.entities.splice(index, 1);
    }
    this.postCommand(new RemoveChildFromEntityElementCommand(entityelement, parent), false);
  }

  createPropertyElement(doSave: boolean, entity: EntityElement, epic: EpicElement, name?: string): PropertyElement {
    const newItem = new PropertyElement();
    newItem.guid = UUID.UUID();
    newItem.designGuid = entity.designGuid;
    newItem.epicGuid = entity.epicGuid;
    newItem.entityGuid = entity.guid;
    newItem.name = name;
    if (doSave) {
      entity.properties.push(newItem);
      const commands = new Array<Command>();

      const createPropertyCommand = new CreatePropertyElementCommand(newItem);
      commands.push(createPropertyCommand);

      const createPropertyCodeGenCommand = new CreatePropertyCodeGenCommand(newItem, entity, epic);
      commands.push(createPropertyCodeGenCommand);

      this.commandsService.postCommands(commands, false);
    }
    return newItem;
  }

  createPropertyElementCodeGen(entity: EntityElement, epic: EpicElement, newItem: PropertyElement): void {
    const commands = new Array<Command>();

    const createPropertyCodeGenCommand = new CreatePropertyCodeGenCommand(newItem, entity, epic);
    commands.push(createPropertyCodeGenCommand);

    this.commandsService.postCommands(commands, false);
  }

  createCommandElement(doSave: boolean, entity: EntityElement, name?: string): CommandElement {
    const newItem = new CommandElement();
    newItem.guid = UUID.UUID();
    newItem.designGuid = entity.designGuid;
    newItem.epicGuid = entity.epicGuid;
    newItem.entityGuid = entity.guid;
    newItem.name = name;
    if (doSave) {
      entity.commands.push(newItem);
      const createCommandCommand = new CreateCommandElementCommand(newItem);
      this.commandsService.postCommand(createCommandCommand, false);
    }
    return newItem;
  }
  deleteDesign(design: Design): void {
    const index = this.designs.indexOf(design, 0);
    if (index > -1) {
      this.designs.splice(index, 1);
    }
    this.postCommand(new DeleteDesignCommand(design), false);
  }

  deletePropertyElement(propertyElement: PropertyElement): void {
    this.postCommand(new DeletePropertyElementCommand(propertyElement), false);
  }

  cloneDesign(original: Design): Design {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getDesigns(searchText: string): Promise<Array<Design>> {
    //    return Promise.resolve(DESIGNS);
    if (this.designs.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Design>(this.designs, prj => prj.name.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.designs); }
    } else {
      return this.http.get(this.designsUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.designs))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getDesign(guid: string): Promise<Design> {
    // if mock, then reload all
    if (guid.length < 10 && this.designs.length === 0) {
      for (const state of DESIGNS) {
        this.designs.push(new Design(state));
      }
    }
    if (this.designs.length > 0) {
      const result = _.find(this.designs, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.designsUrl + '/' + guid)
        .toPromise()
        .then(response => this.parseSingleResponse(response, this.designs))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseSingleResponse(response: any, Designs: Array<Design>): Design {
    const design = new Design(response.json() as DesignState);
    const result = _.find(this.designs, prj => prj.guid === design.guid);
    if (!result) {
      Designs.push(design);
    }
    return design;
  }

  parseResponse(response: any, Designs: Array<Design>): Array<Design> {
    const states = response.json() as Array<DesignState>;
    Designs = new Array<Design>();
    for (const state of states) {
      const design = new Design(state);
      Designs.push(design);
    }
    // include mocks for UI-only development
    for (const state of DESIGNS) {
      const design = new Design(state);
      Designs.push(design);
    }
    return Designs;
  }

  postCommand(command: DesignCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    this.notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }

}
