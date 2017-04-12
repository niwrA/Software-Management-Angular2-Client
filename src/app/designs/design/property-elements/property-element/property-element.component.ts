import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../../epic-elements/epic-element';
import { EntityElement } from '../../entity-elements/entity-element';
import { PropertyElement } from '../property-element';
import * as _ from 'lodash';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId'], params['propertyElementId']])
      .subscribe(([designId, epicElementId, entityElementId, propertyElementId]) => {
        this.getPropertyElement(designId, epicElementId, entityElementId, propertyElementId);
      });
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
