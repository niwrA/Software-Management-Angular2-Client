import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../../designs.service';
import { Design } from '../../../../design';
import { EntityElement } from '../../entity-element';
import { EpicElement } from '../../../epic-elements/epic-element';
import { CommandsService } from '../../../../../commands/commands.service';
import { RenameEntityElementCommand, ChangeDescriptionOfEntityElementCommand } from '../entity-element.commands';

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
    this.route.parent.parent.params.map(params => [params['designId'], params['epicElementId']])
      .subscribe(([designId, epicElementId, entityElementId]) => {
        this.getEpicElement(designId, epicElementId);
      });
    this.route.parent.params.map(params => [params['entityElementId']])
      .subscribe(([entityElementId]) => {
        this.getEntityElement(entityElementId);
      });
  }
  getEpicElement(designId: string, epicElementId: string) {
    this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId));
  }

  getEntityElement(entityElementId: string) {
    this.updateEntityElement(entityElementId);
  }

  // todo: this won't work for multiple epics, just for quick UI design
  updateEntityElement(entityElementId: string) {
    if (entityElementId) {
      if (this.epicElement) {
        this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
        this.previousEntityElement = this.entityElement.clone();
      } else {
        this.entityElementId = entityElementId;
      }
    }
  }

  updateEpicElement(design: Design, epicElementId: string) {
    if (epicElementId) {
      this.design = design;
      this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
      if (this.entityElementId && !this.entityElement) {
        this.updateEntityElement(this.entityElementId);
      }
    }
  }

  changeName(): void {
    if (this.previousEntityElement !== undefined) {
      if (this.entityElement.name !== this.previousEntityElement.name) {
        const renameCommand = new RenameEntityElementCommand(this.entityElement, this.previousEntityElement.name, this.design.guid);
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
        const command = new ChangeDescriptionOfEntityElementCommand(this.entityElement, this.design.guid);
        this.service.postCommand(command, false);
        this.previousEntityElement.description = this.entityElement.description;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }
}
