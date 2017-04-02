/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectRoleAssignmentsService } from './projectroleassignments.service';
import { CommandsService } from '../commands/commands.service';
import { CommandsServiceStub } from '../commands/mock-commands';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsServiceStub } from '../external/mock-external';

describe('ProjectRoleAssignmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectRoleAssignmentsService,
        {
          provide: CommandsService,
          useClass: CommandsServiceStub
        },
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

  it('should ...', inject([ProjectRoleAssignmentsService], (service: ProjectRoleAssignmentsService) => {
    expect(service).toBeTruthy();
  }));
});
