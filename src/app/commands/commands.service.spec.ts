/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CommandsService } from './commands.service';
import { CommandsServiceStub } from './mock-commands';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsServiceStub } from '../external/mock-external';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandsService,
        {
          provide: NotificationsService,
          useClass: NotificationsServiceStub
        },
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions]
    });
  });

  it('should ...', inject([CommandsService], (service: CommandsService) => {
    expect(service).toBeTruthy();
  }));
});
