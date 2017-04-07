import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LinksService } from './links.service';
import { Link } from './link';
import * as _ from 'lodash';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit {
  private _forGuid: string;
  @Input()
  set forGuid(guid: string) {
    this._forGuid = guid;
    this.getLinks(guid);
  }
  get companyroleguid() { return this._forGuid; }

  @Input() links = new Array<Link>();
  @Input() allLinks = new Array<Link>();
  @Input() selectedLinks = new Array<Link>();
  @Input() canAdd: boolean;
  selectedLink: Link;
  searchText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LinksService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getLinksForGuid(params['forId']));
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

  clearSelection(): void {
    this.selectedLink = null;
  }

  getLinksForGuid(forGuid: string): void {
    this._forGuid = forGuid;
    this.service.getLinksForGuid(forGuid).then(links => this.updateLinks(links));
  }

  getLinks(searchText: string): void {
    this.service.getLinks(searchText).then(links => this.updateLinks(links));
  }

  filterLinks(): void {
    if (this.searchText && this.searchText.length > 0) {
      this.links = _.filter<Link>(this.allLinks, prj => prj.name.indexOf(this.searchText) > -1);
    } else { this.updateLinks(this.allLinks); }
    if (this.links.length === 0) {
      this.updateLinks(this.allLinks);
    }
  }

  updateFilteredLinks(links: Array<Link>): void {
    this.links = new Array<Link>();
    links.forEach(element => {
      this.links.push(element);
    });
  }

  updateLinks(links: Array<Link>): void {
    this.updateFilteredLinks(links);
    this.allLinks = links;
  }

  createLink(url: string): void {
    const link = this.service.createLink(true, url, this._forGuid);
    this.links.push(link);
  }

  deleteLink(link: Link): void {
    this.service.deleteLink(link);
    const index = this.links.indexOf(link, 0);
    if (index > -1) {
      this.links.splice(index, 1);
    }
  }

  searchTextChanged(): void {
    this.canAdd = this.searchText.length > 0;
  }

  toggleSelect(link: Link): void {
    if (!link.isSelected) {
      this.selectedLinks.push(link);
    } else {
      const index = this.selectedLinks.indexOf(link, 0);
      if (index > -1) {
        this.selectedLinks.splice(index, 1);
      }
    }
  }
}
