/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SemgraphService } from './semgraph.service';

describe('SemgraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemgraphService]
    });
  });

  it('should ...', inject([SemgraphService], (service: SemgraphService) => {
    expect(service).toBeTruthy();
  }));
});
