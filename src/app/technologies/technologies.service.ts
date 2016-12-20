import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Technology } from './Technology';
import { TECHNOLOGIES } from './mock-technologies';
import * as _ from 'lodash';

@Injectable()

export class TechnologiesService {

  technologies = new Array<Technology>();

  constructor() {
    this.technologies = TECHNOLOGIES;
  }

  createTechnology(): Technology {
    let newItem = new Technology;
    newItem.Guid = UUID.UUID();
    this.technologies.splice(0, 0, newItem);
    return newItem;
  }

  getTechnologies(searchText: string): Promise<Technology[]> {
    if (searchText && searchText.length > 0) {

      let results = _.filter<Technology>(this.technologies, prj => prj.Name.indexOf(searchText) > -1);
      return Promise.resolve(results);
    }
    return Promise.resolve(this.technologies);
  }

  getTechnology(guid: string): Promise<Technology> {
    return Promise.resolve(this.technologies.find(f => f.Guid === guid));
  }
}
