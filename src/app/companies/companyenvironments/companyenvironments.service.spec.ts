/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyenvironmentsService } from './companyenvironments.service';

describe('CompanyenvironmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyenvironmentsService]
    });
  });

  it('should ...', inject([CompanyenvironmentsService], (service: CompanyenvironmentsService) => {
    expect(service).toBeTruthy();
  }));
});
