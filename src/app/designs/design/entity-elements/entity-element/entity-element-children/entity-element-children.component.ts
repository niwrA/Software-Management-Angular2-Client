
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Design } from '../../../../design';
import { EpicElement } from '../../../epic-elements/epic-element';
import { DesignsService } from '../../../../designs.service';
import { EntityElement } from '../../entity-element';
import * as _ from 'lodash';
@Component({
  selector: 'app-entity-element-children',
  templateUrl: './entity-element-children.component.html',
  styleUrls: ['./entity-element-children.component.css']
})
export class EntityElementChildrenComponent implements OnInit {

  design: Design;
  entityelement: EntityElement;
  designId: string;
  epicelementId: string;
  epicelement: EpicElement;
  entityelementId: string;
  children: Array<EntityElement>;
  filteredchildren: Array<EntityElement>;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService) { }

  ngOnInit() {
    this.route.parent.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId']])
      .subscribe(([designId, epicelementId, entityelementId]) => {
        this.getEntityElement(designId, epicelementId, entityelementId);
      });
  }

  getEntityElement(designId: string, epicelementId: string, entityelementId): void {
    if (designId && epicelementId && entityelementId) {
      this.designId = designId;
      this.epicelementId = epicelementId;
      this.service.getDesign(designId).then(design => this.updateEntityElement(design, epicelementId, entityelementId));
    }
  }
  updateChildren(entityelementId: string) {
    this.children = _.filter(this.epicelement.entities, function (c) { return c.parentGuid === entityelementId });
  }
  updateEntityElement(design: Design, epicelementId: string, entityelementId: string) {
    this.design = design;
    this.epicelement = _.find(design.epics, c => c.guid === epicelementId);
    this.entityelement = _.find(this.epicelement.entities, function (c) { return c.guid === entityelementId });
    this.updateChildren(entityelementId);
    this.getEntityElements();
  }
  getEntityElements(): void {
    const searchText = this.searchText;
    if (this.children) {
      if (searchText && searchText.length > 0) {
        this.filteredchildren = _.filter<EntityElement>
          (this.children, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.filteredchildren = this.children;
      }
    }
  }

  createEntityElementChild(name: string): void {
    const entityelement = this.service.createEntityElementChild(true, this.epicelement, this.entityelement, name);
    this.updateChildren(this.entityelement.guid);
    this.getEntityElements();
  }

  deleteEntityElementChild(entityelement: EntityElement): void {
    this.service.removeChildFromEntityElement(this.epicelement, entityelement, this.entityelement);
    this.updateChildren(this.entityelement.guid);
    this.getEntityElements();
  }

}
