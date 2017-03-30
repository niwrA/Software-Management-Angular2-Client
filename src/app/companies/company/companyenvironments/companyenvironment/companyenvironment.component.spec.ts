import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyenvironmentComponent } from './companyenvironment.component';

describe('CompanyenvironmentComponent', () => {
  let component: CompanyenvironmentComponent;
  let fixture: ComponentFixture<CompanyenvironmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyenvironmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyenvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
