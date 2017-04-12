import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Design, DesignState } from './design';
import { EpicElement } from './design/epic-elements/epic-element';
import { EntityElement } from './design/entity-elements/entity-element';
import { PropertyElement } from './design/property-elements/property-element';
import { DESIGNS } from './mock-designs';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import {
  DesignCommand, CreateDesignCommand, DeleteDesignCommand,
  RenameDesignCommand
} from './design/design.commands';
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
    const newItem = new Design;
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
    const newItem = new EpicElement;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      design.epics.push(newItem);
      //      const createDesignCommand = new CreateDesignCommand(newItem);
      //      this.commandsService.postCommand(createDesignCommand, false);
    }
    return newItem;
  }
  createEntityElement(doSave: boolean, epic: EpicElement, name?: string): EntityElement {
    const newItem = new EntityElement;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      epic.entities.push(newItem);
      //      const createDesignCommand = new CreateDesignCommand(newItem);
      //      this.commandsService.postCommand(createDesignCommand, false);
    }
    return newItem;
  }
  createPropertyElement(doSave: boolean, entity: EntityElement, name?: string): PropertyElement {
    const newItem = new PropertyElement;
    newItem.guid = UUID.UUID();
    newItem.name = name;
    if (doSave) {
      entity.properties.push(newItem);
      //      const createDesignCommand = new CreateDesignCommand(newItem);
      //      this.commandsService.postCommand(createDesignCommand, false);
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
    Designs.push(design);
    return design;
  }

  parseResponse(response: any, Designs: Array<Design>): Array<Design> {
    const states = response.json() as Array<DesignState>;
    Designs = new Array<Design>();
    for (const state of states) {
      Designs.push(new Design(state));
    }
    // include mocks for UI-only development
    for (const state of DESIGNS) {
      Designs.push(new Design(state));
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
