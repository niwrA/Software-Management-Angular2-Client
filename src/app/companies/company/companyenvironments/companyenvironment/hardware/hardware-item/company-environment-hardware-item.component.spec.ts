import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentHardwareItemComponent } from './company-environment-hardware-item.component';

describe('CompanyEnvironmentHardwareItemComponent', () => {
  let component: CompanyEnvironmentHardwareItemComponent;
  let fixture: ComponentFixture<CompanyEnvironmentHardwareItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentHardwareItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentHardwareItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
