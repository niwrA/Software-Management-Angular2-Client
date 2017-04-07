import { Injectable, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { Link, LinkState } from './link';
import { LINKS } from './mock-links';
import { CommandsService } from '../commands/commands.service';
import { NotificationsService } from 'angular2-notifications';
import { LinkCommand, CreateLinkCommand, DeleteLinkCommand } from './link/link.commands';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class LinksService {
  linksUrl = environment.linksUrl;
  links = new Array<Link>();

  constructor(private commandsService: CommandsService, private http: Http, private notificationService: NotificationsService) {
    this.getLinks('').then(result => this.links = result as Array<Link>);
  }

  createLink(doSave: boolean, url: string, forGuid: string): Link {
    const newItem = new Link();
    newItem.guid = UUID.UUID();
    newItem.url = url;
    newItem.name = url;
    newItem.forGuid = forGuid;
    if (doSave) {
      this.links.splice(0, 0, newItem);
      const createLinkCommand = new CreateLinkCommand(newItem);
      this.commandsService.postCommand(createLinkCommand, false);
    }
    return newItem;
  }

  deleteLink(link: Link): void {
    const index = this.links.indexOf(link, 0);
    if (index > -1) {
      this.links.splice(index, 1);
    }
    this.postCommand(new DeleteLinkCommand(link), false);
  }

  cloneLink(original: Link): Link {
    if (original) {
      const clonedItem = original.clone();
      return clonedItem;
    }
  }

  getLinksForGuid(forGuid: string): Promise<Array<Link>> {
    if (this.links.length > 0) {
      if (forGuid && forGuid.length > 0) {
        const results = _.filter<Link>(this.links, prj => prj.forGuid === forGuid);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.links); }
    } else {
      return this.http.get(this.linksUrl + '/forGuid/' + forGuid)
        .toPromise()
        .then(response => this.parseResponse(response, this.links))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  getLinks(searchText: string): Promise<Array<Link>> {
    if (this.links.length > 0) {
      if (searchText && searchText.length > 0) {
        const results = _.filter<Link>(this.links, prj => prj.name.indexOf(searchText) > -1 || prj.url.indexOf(searchText) > -1);
        return Promise.resolve(results);
      } else { return Promise.resolve(this.links); }
    } else {
      return this.http.get(this.linksUrl)
        .toPromise()
        .then(response => this.parseResponse(response, this.links))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  parseResponse(response: any, links: Array<Link>): Array<Link> {
    const states = response.json() as Array<LinkState>;
    links = new Array<Link>();
    // todo: option to add/update
    for (const state of states) {
      links.push(new Link(state));
    }
    return links;
  }

  getLink(guid: string): Promise<Link> {
    if (this.links.length > 0) {
      const result = _.find(this.links, prj => prj.guid === guid);
      return Promise.resolve(result);
    } else {
      return this.http.get(this.linksUrl + '/' + guid)
        .toPromise()
        .then(response => new Link(response.json() as LinkState))
        .catch(error => this.handleError(error, this.notificationService));
    }
  }

  postCommand(command: LinkCommand, replaceOriginal: boolean) {
    this.commandsService.postCommand(command, replaceOriginal);
  }

  private handleError(error: any, notificationService: NotificationsService): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    notificationService.error('An error occurred', error, { timeOut: 5000, clickToClose: false });
    return Promise.reject(error.message || error);
  }
}
