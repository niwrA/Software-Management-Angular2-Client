import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Design } from '../design';
import { DesignsService } from '../designs.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  design: Design;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getDesign(params['designId']))
    .subscribe((design: Design) => this.design = design);
  }
}