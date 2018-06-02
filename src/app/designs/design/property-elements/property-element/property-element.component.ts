
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../../epic-elements/epic-element';
import { EntityElement } from '../../entity-elements/entity-element';
import { PropertyElement } from '../property-element';
import * as _ from 'lodash';
import { NavLink } from '../../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-property-element',
  templateUrl: './property-element.component.html',
  styleUrls: ['./property-element.component.css']
})

export class PropertyElementComponent implements OnInit {
  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  propertyElement: PropertyElement;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
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
    this.route.parent.paramMap.subscribe(params => this.getPropertyElement(params.get('designId'),
      params.get('epicElementId'), params.get('entityElementId'), params.get('propertyElementId')));
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
  }
}
