/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyEnvironmentsService } from './companyenvironments.service';

describe('CompanyEnvironmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyEnvironmentsService]
    });
  });

  it('should ...', inject([CompanyEnvironmentsService], (service: CompanyEnvironmentsService) => {
    expect(service).toBeTruthy();
  }));
});
