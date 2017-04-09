import { Design, DesignState } from './design';
export const DESIGNS: DesignState[] = [
  {guid: 'design11', name: 'Nice Suite', description: 'description'},
  {guid: 'design12', name: 'Narco Suite', description: 'description'},
  {guid: 'design13', name: 'Bombasto Suite', description: 'description'},
  {guid: 'design14', name: 'Celeritas Suite', description: 'description'},
  {guid: 'design15', name: 'Magneta Suite', description: 'description'},
  {guid: 'design16', name: 'RubberMan Suite', description: 'description'},
  {guid: 'design17', name: 'Dynama Suite', description: 'description'},
  {guid: 'design18', name: 'Dr IQ Suite', description: 'description'},
  {guid: 'design19', name: 'Magma Suite', description: 'description'},
  {guid: 'design20', name: 'Tornado Suite', description: 'description'}
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
