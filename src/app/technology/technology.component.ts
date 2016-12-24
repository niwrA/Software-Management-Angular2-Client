import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Technology } from '../technologies/technology';
import { TechnologiesService } from '../technologies/technologies.service';

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
  ){}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getTechnology(params['technologyId']))
    .subscribe((technology: Technology) => this.technology = technology);
  }

}
