
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../../epic-elements/epic-element';
import { EntityElement } from '../entity-element';
import * as _ from 'lodash';
import { NavLink } from '../../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-entity-element',
  templateUrl: './entity-element.component.html',
  styleUrls: ['./entity-element.component.css']
})
export class EntityElementComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('propertyelements', 'Properties', false),
    new NavLink('commandelements', 'Commands', false),
    new NavLink('children', 'Children', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

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
  }
}
