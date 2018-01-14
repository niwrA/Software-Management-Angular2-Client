import { TestBed, inject } from '@angular/core/testing';

import { ProductInstallationsService } from './product-installations.service';

describe('ProductInstallationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductInstallationsService]
    });
  });

  it('should be created', inject([ProductInstallationsService], (service: ProductInstallationsService) => {
    expect(service).toBeTruthy();
  }));
});
