import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleAssignmentsComponent } from './projectroleassignments.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProjectRoleAssignmentsComponent', () => {
  let component: ProjectRoleAssignmentsComponent;
  let fixture: ComponentFixture<ProjectRoleAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectRoleAssignmentsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoleAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
