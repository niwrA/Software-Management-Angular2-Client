import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentSoftwareComponent } from './company-environment-software.component';

describe('CompanyEnvironmentSoftwareComponent', () => {
  let component: CompanyEnvironmentSoftwareComponent;
  let fixture: ComponentFixture<CompanyEnvironmentSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
