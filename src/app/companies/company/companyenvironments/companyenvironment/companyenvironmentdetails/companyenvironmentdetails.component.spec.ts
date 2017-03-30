import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentDetailsComponent } from './companyenvironmentdetails.component';

describe('CompanyenvironmentdetailsComponent', () => {
  let component: CompanyEnvironmentDetailsComponent;
  let fixture: ComponentFixture<CompanyEnvironmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
