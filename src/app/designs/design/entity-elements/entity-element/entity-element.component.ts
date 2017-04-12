import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EntityElement } from '../entity-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-entity-element',
  templateUrl: './entity-element.component.html',
  styleUrls: ['./entity-element.component.css']
})
export class EntityElementComponent implements OnInit {

  design: Design;
  entityElement: EntityElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.params.map(params => [params['designId'], params['entityElementId']])
      .subscribe(([designId, entityElementId]) => {
        this.getEntityElement(designId, entityElementId);
      });
  }

  getEntityElement(designId: string, entityElementId: string) {
    if (designId && entityElementId) {
      this.service.getDesign(designId).then(design => this.updateEntityElement(design, entityElementId));
    }
  }

  updateEntityElement(design: Design, entityElementId: string) {
    this.design = design;
    this.design.epics.forEach(epic => {
      this.entityElement = epic.entities.find(entity => entity.guid === entityElementId);
    });
  }
}
