/* tslint:disable:no-unused-variable */
import { fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectDetailsComponent } from './projectdetails.component';
import { ProjectsService } from '../../projects.service';
import { ProjectsServiceStub } from '../../mock-projects';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let activatedRoute: any; // todo: cleanup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'projects/:projectId', component: ProjectDetailsComponent }])],
      declarations: [ProjectDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ProjectsService, useClass: ProjectsServiceStub }, {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { projectId: 'nodates'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
