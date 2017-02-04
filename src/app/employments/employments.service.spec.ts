/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmploymentsService } from './employments.service';

describe('EmploymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmploymentsService]
    });
  });

  it('should ...', inject([EmploymentsService], (service: EmploymentsService) => {
    expect(service).toBeTruthy();
  }));
});
