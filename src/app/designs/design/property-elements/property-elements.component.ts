
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../designs.service';
import { Design } from '../../design';
import { PropertyElement } from './property-element';
import { EpicElement } from '../epic-elements/epic-element';
import { EntityElement } from '../entity-elements/entity-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-property-elements',
  templateUrl: './property-elements.component.html',
  styleUrls: ['./property-elements.component.css'],
  providers: [DesignsService]
})

export class PropertyElementsComponent implements OnInit {
  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;
  searchText = '';
  propertyElements: Array<PropertyElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.getEpicElement(
      params.get('designId'), params.get('epicElementId'), params.get('entityElementId')));
  }

  getEpicElement(designId: string, epicElementId: string, entityElementId: string) {
    this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId, entityElementId));
  }

  updateEpicElement(design: Design, epicElementId: string, entityElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.entityElement = this.epicElement.entities.find(entity => entity.guid === entityElementId);
    this.getPropertyElements(this.searchText);
  }

  getDesign(guid: string) {
    this.service.getDesign(guid).then(design => this.updateDesign(design));
  }

  updateDesign(design: Design) {
    this.design = design;
  }

  getPropertyElements(searchText: string): void {
    if (this.entityElement && this.entityElement.properties) {
      if (searchText.length > 0) {
        this.propertyElements = _.filter<PropertyElement>(this.entityElement.properties, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.propertyElements = this.entityElement.properties;
      }
    }
  }

  createPropertyElement(name: string): void {
    this.service.createPropertyElement(true, this.entityElement, this.epicElement, this.design, name);
    this.getPropertyElements(this.searchText);
  }

  deletePropertyElement(propertyElement: PropertyElement): void {
    const index = this.entityElement.properties.indexOf(propertyElement, 0);
    if (index > -1) {
      this.entityElement.properties.splice(index, 1);
    }
    this.service.deletePropertyElement(propertyElement, this.design);
  }
}
