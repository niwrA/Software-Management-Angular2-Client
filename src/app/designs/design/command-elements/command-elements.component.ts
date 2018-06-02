
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../designs.service';
import { Design } from '../../design';
import { CommandElement } from './command-element';
import { EpicElement } from '../epic-elements/epic-element';
import { EntityElement } from '../entity-elements/entity-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-command-elements',
  templateUrl: './command-elements.component.html',
  styleUrls: ['./command-elements.component.css'],
  providers: [DesignsService]
})

export class CommandElementsComponent implements OnInit {
  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  searchText = '';
  commandElements: Array<CommandElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => this.getEpicElement(
      params.get('designId'), params.get('epicElementId'), params.get('entityElementId')))
  }

  getEpicElement(designId: string, epicElementId: string, entityElementId: string) {
    this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId, entityElementId));
  }

  updateEpicElement(design: Design, epicElementId: string, entityElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
    this.getCommandElements(this.searchText);
  }

  getDesign(guid: string) {
    this.service.getDesign(guid).then(design => this.updateDesign(design));
  }

  updateDesign(design: Design) {
    this.design = design;
  }

  getCommandElements(searchText: string): void {
    if (this.entityElement && this.entityElement.commands) {
      if (searchText.length > 0) {
        this.commandElements = _.filter<CommandElement>(this.entityElement.commands, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.commandElements = this.entityElement.commands;
      }
    }
  }

  createCommandElement(name: string): void {
    this.service.createCommandElement(true, this.entityElement, name);
    this.getCommandElements(this.searchText);
  }
}
