/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';

import { CompanyDetailsComponent } from './companydetails.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CompaniesService } from '../../companies.service';
import { CompaniesServiceStub } from '../../mock-companies';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  let activatedRoute: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'companies/:companyId', component: CompanyDetailsComponent }])],
      declarations: [CompanyDetailsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CompaniesService, useClass: CompaniesServiceStub }, {provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { companyId: 'company11' };
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
