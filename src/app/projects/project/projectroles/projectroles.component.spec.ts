/* tslint:disable:no-unused-variable */
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectRolesComponent } from './projectroles.component';
import { ProjectsService } from '../../projects.service';
import { ProjectsServiceStub } from '../../mock-projects';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProjectRolesComponent', () => {
  let component: ProjectRolesComponent;
  let fixture: ComponentFixture<ProjectRolesComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'projects/:projectId', component: ProjectRolesComponent }])],
      declarations: [ProjectRolesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ProjectsService, useClass: ProjectsServiceStub }, { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ProjectRolesComponent);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { projectId: 'with2roles' };
    fixture.detectChanges();
    tick();
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should expose projectroles for project in parameter', fakeAsync(() => {
    tick();
    expect(component.projectroles.length).toBe(2);
  }));
});
