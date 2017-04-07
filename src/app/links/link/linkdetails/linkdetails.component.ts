import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Link } from '../../link';
import { RenameLinkCommand, ChangeUrlForLinkCommand } from '../link.commands';
import { LinksService } from '../../links.service';

@Component({
  selector: 'app-linkdetails',
  templateUrl: './linkdetails.component.html',
  styleUrls: ['./linkdetails.component.css']
})
export class LinkDetailsComponent implements OnInit {
  link: Link;
  previousLink: Link;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LinksService
  ) { }

  ngOnInit() {
    this.route.parent.params.switchMap((params: Params) => this.service.getLink(params['linkId']))
      .subscribe((link: Link) => this.update(link));
  }

  update(newValue) {
    if (newValue) {
      this.previousLink = this.service.cloneLink(newValue);
      this.link = newValue;
    }
  }

  changeName(): void {
    if (this.previousLink !== undefined) {
      if (this.link.name !== this.previousLink.name) {
        const renameCommand = new RenameLinkCommand(this.link, this.previousLink.name);
        this.service.postCommand(renameCommand, false);
        this.previousLink.name = this.link.name;
      }
    } else {
      this.previousLink = this.link;
    }
  }

  changeUrl(): void {
    if (this.link.url !== this.previousLink.url) {
      const changeUrlForCommand = new ChangeUrlForLinkCommand(this.link, this.previousLink.url);
      this.service.postCommand(changeUrlForCommand, false);
      this.previousLink.url = this.link.url;
    }
  }
}
