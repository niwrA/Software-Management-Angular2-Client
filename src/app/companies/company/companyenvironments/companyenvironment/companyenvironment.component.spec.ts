import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEnvironmentComponent } from './companyenvironment.component';

describe('CompanyenvironmentComponent', () => {
  let component: CompanyEnvironmentComponent;
  let fixture: ComponentFixture<CompanyEnvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEnvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
