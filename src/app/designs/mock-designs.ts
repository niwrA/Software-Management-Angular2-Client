import { Design, DesignState } from './design';
import { EpicElementState } from './design/epic-elements/epic-element';

export const DESIGNS: DesignState[] = [
  {
    guid: 'design11', name: 'Nice Suite', description: 'description',
    epicElements: [{
      guid: 'epic11', name: 'Projects', description: 'description', designGuid: 'design11',
      entityElements: [{
        guid: 'entity11', name: 'Project', description: 'description', parentGuid: '', designGuid: 'design11', epicElementGuid: 'epic11',
        propertyElements: [{ guid: 'property11', name: 'Name', description: 'description',
          designGuid: 'design11', epicElementGuid: 'epic11', entityElementGuid: 'entity11' },
        {
          guid: 'property12', name: 'Description', description: 'description',
          designGuid: 'design11', epicElementGuid: 'epic11', entityElementGuid: 'entity11'
        }],
        commandElements: [{
          guid: 'command11', name: 'ChangeNameOf', description: 'description',
          designGuid: 'design11', epicElementGuid: 'epic11', entityElementGuid: 'entity11'
        },
        { guid: 'command12', name: 'ChangeDescriptionOf', description: 'description',
          designGuid: 'design11', epicElementGuid: 'epic11', entityElementGuid: 'entity11' }]
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
