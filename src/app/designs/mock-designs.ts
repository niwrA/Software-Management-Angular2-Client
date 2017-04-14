import { Design, DesignState } from './design';
import { EpicElementState } from './design/epic-elements/epic-element';

export const DESIGNS: DesignState[] = [
  {
    guid: 'design11', name: 'Nice Suite', description: 'description',
    epicElements: [{
      guid: 'epic11', name: 'Projects', description: 'description',
      entityElements: [{
        guid: 'entity11', name: 'Project', description: 'description',
        propertyElements: [{ guid: 'property11', name: 'Name', description: 'description' },
        { guid: 'property12', name: 'Description', description: 'description' }],
        commandElements: [{ guid: 'command11', name: 'ChangeNameOf', description: 'description' },
        { guid: 'command12', name: 'ChangeDescriptionOf', description: 'description' }]
      }]
    }]
  }
];

export class DesignsServiceStub {
  designs: Array<Design> = new Array<Design>();
  constructor() {
    DESIGNS.forEach(element => {
      this.designs.push(new Design(element));
    });
  }
  getDesigns(searchText: string): Promise<Array<Design>> {
    return Promise.resolve(this.designs);
  };
  getDesign(guid: string): Promise<Design> {
    return Promise.resolve(this.designs.find(f => f.guid === guid));
  };
};
