
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../../designs.service';
import { Design } from '../../../../design';
import { EntityElement } from '../../entity-element';
import { EpicElement } from '../../../epic-elements/epic-element';
import { CommandsService } from '../../../../../commands/commands.service';
import {
  RenameEntityElementCommand, ChangeDescriptionOfEntityElementCommand,
  ChangePluralNameOfEntityElementCommand, ChangeIsCollectionForEntityElementCommand
} from '../entity-element.commands';

import * as _ from 'lodash';

@Component({
  selector: 'app-entity-element-details',
  templateUrl: './entity-element-details.component.html',
  styleUrls: ['./entity-element-details.component.css']
})

export class EntityElementDetailsComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  previousEntityElement: EntityElement;
  entityElement: EntityElement;
  private entityElementId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getEntityElement(
      params.get('designId'), params.get('epicElementId'), params.get('entityElementId')))
  }

  getEntityElement(designId: string, epicElementId: string, entityElementId: string) {
    if (designId && epicElementId && entityElementId) {
      this.service.getDesign(designId).then(design => this.updateEntityElement(design, epicElementId, entityElementId));
    }
  }

  // todo: this won't work with more epics, just for ui design setup
  updateEntityElement(design: Design, epicElementId: string, entityElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
    this.previousEntityElement = this.entityElement.clone();
  }

  changeName(): void {
    if (this.previousEntityElement !== undefined) {
      if (this.entityElement.name !== this.previousEntityElement.name) {
        const renameCommand = new RenameEntityElementCommand(this.entityElement, this.design, this.previousEntityElement.name);
        this.service.postCommand(renameCommand, false);
        this.previousEntityElement.name = this.entityElement.name;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }

  changeDescription(): void {
    if (this.previousEntityElement !== undefined) {
      if (this.entityElement.description !== this.previousEntityElement.description) {
        const command = new ChangeDescriptionOfEntityElementCommand(this.entityElement, this.design);
        this.service.postCommand(command, false);
        this.previousEntityElement.description = this.entityElement.description;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }

  changePluralName(): void {
    if (this.previousEntityElement !== undefined) {
      if (this.entityElement.pluralName !== this.previousEntityElement.pluralName) {
        const renameCommand = new ChangePluralNameOfEntityElementCommand(this.entityElement, this.design, this.previousEntityElement.pluralName);
        this.service.postCommand(renameCommand, false);
        this.previousEntityElement.pluralName = this.entityElement.pluralName;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }

  changeIsCollection(value: boolean): void {
    if (this.previousEntityElement !== undefined) {
      if (value !== this.previousEntityElement.isCollection) {
        const renameCommand = new ChangeIsCollectionForEntityElementCommand(this.entityElement, this.design, value);
        this.service.postCommand(renameCommand, false);
        this.previousEntityElement.isCollection = value;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }
}
