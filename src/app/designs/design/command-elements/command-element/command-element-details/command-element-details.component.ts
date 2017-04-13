import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../../designs.service';
import { Design } from '../../../../design';
import { CommandElement } from '../../command-element';
import { EpicElement } from '../../../epic-elements/epic-element';
import { EntityElement } from '../../../entity-elements/entity-element';
import { CommandsService } from '../../../../../commands/commands.service';
import { RenameCommandElementCommand, ChangeDescriptionOfCommandElementCommand } from '../command-element.commands';

import * as _ from 'lodash';

@Component({
  selector: 'app-command-element-details',
  templateUrl: './command-element-details.component.html',
  styleUrls: ['./command-element-details.component.css']
})

export class CommandElementDetailsComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  previousCommandElement: CommandElement;
  commandElement: CommandElement;
  private commandElementId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId'], params['commandElementId']])
      .subscribe(([designId, epicElementId, entityElementId, commandElementId]) => {
        this.getCommandElement(designId, epicElementId, entityElementId, commandElementId);
      });
  }

  getCommandElement(designId: string, epicElementId: string, entityElementId: string, commandElementId: string) {
    if (designId && epicElementId && commandElementId) {
      this.service.getDesign(designId).then(design =>
        this.updateCommandElement(design, epicElementId, entityElementId, commandElementId));
    }
  }

  // todo: this won't work with more epics, just for ui design setup
  updateCommandElement(design: Design, epicElementId: string, entityElementId, commandElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
    this.commandElement = this.entityElement.commands.find(command => command.guid === commandElementId);
  }

  changeName(): void {
    if (this.previousCommandElement !== undefined) {
      if (this.commandElement.name !== this.previousCommandElement.name) {
        const renameCommand = new RenameCommandElementCommand(this.commandElement, this.previousCommandElement.name, this.design.guid);
        this.service.postCommand(renameCommand, false);
        this.previousCommandElement.name = this.commandElement.name;
      }
    } else {
      this.previousCommandElement = this.commandElement;
    }
  }

  changeDescription(): void {
    if (this.previousCommandElement !== undefined) {
      if (this.commandElement.description !== this.previousCommandElement.description) {
        const command = new ChangeDescriptionOfCommandElementCommand(this.commandElement, this.design.guid);
        this.service.postCommand(command, false);
        this.previousCommandElement.description = this.commandElement.description;
      }
    } else {
      this.previousCommandElement = this.commandElement;
    }
  }
}
