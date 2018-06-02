
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../../designs.service';
import { Design } from '../../../../design';
import { PropertyElement } from '../../property-element';
import { EpicElement } from '../../../epic-elements/epic-element';
import { EntityElement } from '../../../entity-elements/entity-element';
import { CommandsService } from '../../../../../commands/commands.service';
import {
  RenamePropertyElementCommand, ChangeDescriptionOfPropertyElementCommand,
  ChangeDataTypeOfPropertyElementCommand, ChangeIsStateForPropertyElementCommand
} from '../property-element.commands';

import * as _ from 'lodash';

@Component({
  selector: 'app-property-element-details',
  templateUrl: './property-element-details.component.html',
  styleUrls: ['./property-element-details.component.css']
})

export class PropertyElementDetailsComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  previousPropertyElement: PropertyElement;
  propertyElement: PropertyElement;
  private propertyElementId: string;

  dataTypes = [
    { value: 'string', viewValue: 'String' },
    { value: 'numeric', viewValue: 'Numeric' },
    { value: 'boolean', viewValue: 'Boolean' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getPropertyElement(params.get('designId'),
      params.get('epicElementId'), params.get('entityElementId'), params.get('propertyElementId')))
  }

  getPropertyElement(designId: string, epicElementId: string, entityElementId: string, propertyElementId: string) {
    if (designId && epicElementId && propertyElementId) {
      this.service.getDesign(designId).then(design =>
        this.updatePropertyElement(design, epicElementId, entityElementId, propertyElementId));
    }
  }

  // todo: this won't work with more epics, just for ui design setup
  updatePropertyElement(design: Design, epicElementId: string, entityElementId, propertyElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
    this.propertyElement = this.entityElement.properties.find(property => property.guid === propertyElementId);
    this.previousPropertyElement = this.propertyElement.clone();
  }

  changeName(): void {
    if (this.previousPropertyElement !== undefined) {
      if (this.propertyElement.name !== this.previousPropertyElement.name) {
        const renameCommand = new RenamePropertyElementCommand(this.propertyElement, this.design, this.previousPropertyElement.name);
        this.service.postCommand(renameCommand, false);
        this.previousPropertyElement.name = this.propertyElement.name;
      }
    } else {
      this.previousPropertyElement = this.propertyElement.clone();
    }
  }

  changeDescription(): void {
    if (this.previousPropertyElement !== undefined) {
      if (this.propertyElement.description !== this.previousPropertyElement.description) {
        const command = new ChangeDescriptionOfPropertyElementCommand(this.propertyElement, this.design);
        this.service.postCommand(command, false);
        this.previousPropertyElement.description = this.propertyElement.description;
      }
    } else {
      this.previousPropertyElement = this.propertyElement.clone();
    }
  }

  changeDataType(): void {
    if (this.previousPropertyElement !== undefined) {
      if (this.propertyElement.dataType !== this.previousPropertyElement.dataType) {
        const renameCommand = new ChangeDataTypeOfPropertyElementCommand(this.propertyElement, this.design, this.previousPropertyElement.dataType);
        this.service.postCommand(renameCommand, false);
        this.previousPropertyElement.dataType = this.propertyElement.dataType;
      }
    } else {
      this.previousPropertyElement = this.propertyElement.clone();
    }
  }

  changeIsState(value: boolean): void {
    if (this.previousPropertyElement !== undefined) {
      if (value !== this.previousPropertyElement.isState) {
        const renameCommand = new ChangeIsStateForPropertyElementCommand(this.propertyElement, this.design, value);
        this.service.postCommand(renameCommand, false);
        this.previousPropertyElement.isState = value;
      }
    } else {
      this.previousPropertyElement = this.propertyElement;
    }
  }

  updateCode(): void {
    this.service.createPropertyElementCodeGen(this.entityElement, this.epicElement, this.propertyElement);
  }

}
