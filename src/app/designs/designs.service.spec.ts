import { TestBed, inject } from '@angular/core/testing';

import { DesignsService } from './designs.service';

describe('DesignsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignsService]
    });
  });

  it('should ...', inject([DesignsService], (service: DesignsService) => {
    expect(service).toBeTruthy();
  }));
});
