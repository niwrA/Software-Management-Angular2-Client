import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../designs.service';
import { Design } from '../../design';
import { EntityElement } from './entity-element';
import { EpicElement } from '../epic-elements/epic-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-entity-elements',
  templateUrl: './entity-elements.component.html',
  styleUrls: ['./entity-elements.component.css'],
  providers: [DesignsService]
})

export class EntityElementsComponent implements OnInit {
  design: Design;
  epicElement: EpicElement;
  searchText = '';
  entityElements: Array<EntityElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['designId'], params['epicElementId']])
      .subscribe(([designId, epicElementId]) => {
        this.getEpicElement(designId, epicElementId);
      });
  }

  getEpicElement(designId: string, epicElementId: string) {
    this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId));
  }

  updateEpicElement(design: Design, epicElementId: string) {
    this.design = design;
    this.epicElement = design.epics.find(epic => epic.guid === epicElementId);
    this.getEntityElements(this.searchText);
  }

  getEntityElements(searchText: string): void {
    if (this.epicElement && this.epicElement.entities) {
      if (searchText.length > 0) {
        this.entityElements = _.filter<EntityElement>(this.epicElement.entities, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.entityElements = this.epicElement.entities;
      }
    }
  }

  createEntityElement(name: string): void {
    this.service.createEntityElement(true, this.epicElement, name);
    this.getEntityElements(this.searchText);
  }
}
