
import {switchMap} from 'rxjs/operators';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Link } from '../link';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

  link: Link;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LinksService
  ){}

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.service.getLink(params['linkId'])))
    .subscribe((link: Link) => this.link = link);
  }

}
