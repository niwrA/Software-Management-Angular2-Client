import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../../epic-elements/epic-element';
import { EntityElement } from '../../entity-elements/entity-element';
import { CommandElement } from '../command-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-command-element',
  templateUrl: './command-element.component.html',
  styleUrls: ['./command-element.component.css']
})

export class CommandElementComponent implements OnInit {
  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  commandElement: CommandElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId'], params['commandElementId']])
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
}
