
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../../designs.service';
import { Design } from '../../../../design';
import { EpicElement } from '../../epic-element';
import { CommandsService } from '../../../../../commands/commands.service';
import { RenameEpicElementCommand, ChangeDescriptionOfEpicElementCommand } from '../epic-element.commands';

import * as _ from 'lodash';

@Component({
  selector: 'app-epic-element-details',
  templateUrl: './epic-element-details.component.html',
  styleUrls: ['./epic-element-details.component.css']
})

export class EpicElementDetailsComponent implements OnInit {

  design: Design;
  previousEpicElement: EpicElement;
  epicElement: EpicElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.getEpicElement(params.get('designId'), params.get('epicElementId')))
  }

  getEpicElement(designId: string, epicElementId: string) {
    this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId));
  }

  updateEpicElement(design: Design, epicElementId: string) {
    this.design = design;
    this.epicElement = this.design.epics.find(epic => epic.guid === epicElementId);
    this.previousEpicElement = this.epicElement.clone();
  }

  changeName(): void {
    if (this.previousEpicElement !== undefined) {
      if (this.epicElement.name !== this.previousEpicElement.name) {
        const renameCommand = new RenameEpicElementCommand(this.epicElement, this.design, this.previousEpicElement.name);
        this.service.postCommand(renameCommand, false);
        this.previousEpicElement.name = this.epicElement.name;
      }
    } else {
      this.previousEpicElement = this.epicElement;
    }
  }

  changeDescription(): void {
    if (this.previousEpicElement !== undefined) {
      if (this.epicElement.description !== this.previousEpicElement.description) {
        const command = new ChangeDescriptionOfEpicElementCommand(this.epicElement, this.design);
        this.service.postCommand(command, false);
        this.previousEpicElement.description = this.epicElement.description;
      }
    } else {
      this.previousEpicElement = this.epicElement;
    }
  }
}
