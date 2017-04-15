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
    this.route.parent.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId']])
      .subscribe(([designId, epicElementId, entityElementId]) => {
        this.getEntityElement(designId, epicElementId, entityElementId);
      });
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
  }

  changeName(): void {
    if (this.previousEntityElement !== undefined) {
      if (this.entityElement.name !== this.previousEntityElement.name) {
        const renameCommand = new RenameEntityElementCommand(this.entityElement, this.previousEntityElement.name);
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
        const command = new ChangeDescriptionOfEntityElementCommand(this.entityElement);
        this.service.postCommand(command, false);
        this.previousEntityElement.description = this.entityElement.description;
      }
    } else {
      this.previousEntityElement = this.entityElement;
    }
  }
}
