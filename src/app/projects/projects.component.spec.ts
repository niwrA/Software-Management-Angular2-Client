/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ProjectsServiceStub } from './mock-projects';
import { ProjectsComponent } from './projects.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommandsService } from '../commands/commands.service';
import { CommandsServiceStub } from '../commands/mock-commands';
import { Http } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';
import { NotificationsServiceStub } from '../external/mock-external';
describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{provide: ProjectsService, useClass: ProjectsServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
