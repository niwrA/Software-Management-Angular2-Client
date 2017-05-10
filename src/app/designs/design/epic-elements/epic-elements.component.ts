import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignsService } from '../../designs.service';
import { Design } from '../../design';
import { EpicElement } from './epic-element';
import * as _ from 'lodash';

@Component({
  selector: 'app-epic-elements',
  templateUrl: './epic-elements.component.html',
  styleUrls: ['./epic-elements.component.css'],
  providers: [DesignsService]
})

export class EpicElementsComponent implements OnInit {
  design: Design;
  searchText: string;
  epicElements: Array<EpicElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService,
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getDesign(params['designId']))
      .subscribe((design: Design) => this.updateDesign(design));
  }

  getDesign(guid: string) {
    this.service.getDesign(guid).then(design => this.updateDesign(design));
  }

  updateDesign(design: Design) {
    this.design = design;
    this.getEpicElements('');
  }

  getEpicElements(searchText: string): void {
    if (this.design && this.design.epics) {
      if (searchText.length > 0) {
        this.epicElements = _.filter<EpicElement>(this.design.epics, prj => prj.name.indexOf(this.searchText) > -1);
      } else {
        this.epicElements = this.design.epics;
      }
    }
  }

  createEpicElement(name: string): void {
    this.service.createEpicElement(true, this.design, name);
    this.getEpicElements(this.searchText);
  }
}
