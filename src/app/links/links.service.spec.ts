import { TestBed, inject } from '@angular/core/testing';

import { LinksService } from './links.service';

describe('LinksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinksService]
    });
  });

  it('should ...', inject([LinksService], (service: LinksService) => {
    expect(service).toBeTruthy();
  }));
});
