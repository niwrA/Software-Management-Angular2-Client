import { Injectable } from '@angular/core';
import { Semgraph } from './semgraph';
import { SEMGRAPHS } from './mock-semgraphs';
import * as _ from 'lodash';

@Injectable()
export class SemgraphService {

  constructor() { }

  getSemgraphs(subjectGuid: string, predicateGuid: string): Promise<Semgraph[]> {
    let results = SEMGRAPHS;
    if (subjectGuid && subjectGuid.length > 0) {

      results = _.filter<Semgraph>(results, prj => prj.SubjectGuid === subjectGuid);
    }
    if (predicateGuid && predicateGuid.length > 0) {

      results = _.filter<Semgraph>(results, prj => prj.PredicateGuid === predicateGuid);
    }
    return Promise.resolve(results);
  }
}
