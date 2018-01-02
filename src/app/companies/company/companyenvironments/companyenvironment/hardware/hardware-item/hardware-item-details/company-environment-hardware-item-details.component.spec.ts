import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentHardwareItemDetailsComponent } from './company-environment-hardware-item-details.component';

describe('CompanyEnvironmentHardwareItemDetailsComponent', () => {
  let component: CompanyEnvironmentHardwareItemDetailsComponent;
  let fixture: ComponentFixture<CompanyEnvironmentHardwareItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentHardwareItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentHardwareItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
