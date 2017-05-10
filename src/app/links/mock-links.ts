import { Link, LinkState } from './link';
export const LINKS: LinkState[] = [
  { guid: 'link11', name: 'John Smith', forGuid: 'contact11', url: 'http://nu.nl', description: '', imageUrl: '', siteName: '' },
  { guid: 'link12', name: 'John Smith', forGuid: 'company11', url: 'http://nu.nl', description: '', imageUrl: '', siteName: '' },
];

export class LinksServiceStub {
  links: Array<Link> = new Array<Link>();
  constructor() {
    LINKS.forEach(element => {
      this.links.push(new Link(element));
    });
  }
  getLinks(searchText: string): Promise<Array<Link>> {
    return Promise.resolve(this.links);
  };
  getLinksFor(guid: string): Promise<Array<Link>> {
    return Promise.resolve(this.links.filter(f => f.forGuid === guid));
  };
  getLink(guid: string): Promise<Link> {
    return Promise.resolve(this.links.find(f => f.guid === guid));
  };
};
