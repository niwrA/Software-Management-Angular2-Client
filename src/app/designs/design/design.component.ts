import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Design } from '../design';
import { DesignsService } from '../designs.service';
import { NavLink } from '../../shared/appnavbar/navlink';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class DesignComponent implements OnInit {
  design: Design;
  public navLinks = new Array<NavLink>(
    new NavLink('details', 'Details', true),
    new NavLink('epicelements', 'Epics', false),
    new NavLink('links', 'Links', false),
    new NavLink('files', 'Files', false),
    new NavLink('commands', 'Audit', false)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DesignsService) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getDesign(params['designId']))
    .subscribe((design: Design) => this.design = design);
  }
}