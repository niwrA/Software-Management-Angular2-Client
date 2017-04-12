import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../../epic-elements/epic-element';
import { EntityElement } from '../entity-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-entity-element',
  templateUrl: './entity-element.component.html',
  styleUrls: ['./entity-element.component.css']
})
export class EntityElementComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  entityElement: EntityElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.params.map(params => [params['designId'], params['epicElementId'], params['entityElementId']])
      .subscribe(([designId, epicElementId, entityElementId]) => {
        this.getEntityElement(designId, epicElementId, entityElementId);
      });
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
