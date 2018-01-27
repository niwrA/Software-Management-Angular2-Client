import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../../designs.service';
import { Design } from '../../../design';
import { EpicElement } from '../epic-element';
import * as _ from 'lodash';
import { NavLink } from '../../../../shared/appnavbar/navlink';

@Component({
  selector: 'app-epic-element',
  templateUrl: './epic-element.component.html',
  styleUrls: ['./epic-element.component.css']
})
export class EpicElementComponent implements OnInit {

  design: Design;
  epicElement: EpicElement;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('entityelements', 'Entities', false),
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
    this.route.params.map(params => [params['designId'], params['epicElementId']])
      .subscribe(([designId, epicElementId]) => {
        this.getEpicElement(designId, epicElementId);
      });
  }

  getEpicElement(designId: string, epicElementId: string) {
    if (designId && epicElementId) {
      this.service.getDesign(designId).then(design => this.updateEpicElement(design, epicElementId));
    }
  }

  updateEpicElement(design: Design, epicElementId: string) {
    this.design = design;
    this.epicElement = this.design.epics.find(epic => epic.guid === epicElementId);
  }
}
