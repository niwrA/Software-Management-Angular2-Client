import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentHardwareComponent } from './company-environment-hardware.component';

describe('CompanyEnvironmentHardwareComponent', () => {
  let component: CompanyEnvironmentHardwareComponent;
  let fixture: ComponentFixture<CompanyEnvironmentHardwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentHardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentHardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
