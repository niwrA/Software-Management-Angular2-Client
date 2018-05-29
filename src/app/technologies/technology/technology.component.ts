
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Technology } from '../technology';
import { TechnologiesService } from '../technologies.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent {

  technology: Technology;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TechnologiesService
  ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getTechnology(params['technologyId'])))
      .subscribe((technology: Technology) => this.technology = technology);
  }

}
