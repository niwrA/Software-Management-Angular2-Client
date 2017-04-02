import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleAssignmentsComponent } from './projectroleassignments.component';

describe('ProjectRoleAssignmentsComponent', () => {
  let component: ProjectRoleAssignmentsComponent;
  let fixture: ComponentFixture<ProjectRoleAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRoleAssignmentsComponent ]
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
