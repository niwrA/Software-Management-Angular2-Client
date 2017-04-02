import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoleAssignmentComponent } from './projectroleassignment.component';

describe('ProjectRoleAssignmentComponent', () => {
  let component: ProjectRoleAssignmentComponent;
  let fixture: ComponentFixture<ProjectRoleAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRoleAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
