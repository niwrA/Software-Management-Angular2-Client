/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ProjectsService } from './projects.service';
import { CommandsService } from '../commands/commands.service';
import { CommandsServiceStub } from '../commands/mock-commands';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsServiceStub } from '../external/mock-external';

describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsService, CommandsService,
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

  it('should ...', inject([ProjectsService], (service: ProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
