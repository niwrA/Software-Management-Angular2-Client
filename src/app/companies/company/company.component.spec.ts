/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyComponent } from './company.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';
import { CompaniesService } from '../companies.service';
import { CompaniesServiceStub } from '../mock-companies';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let activatedRoute: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([{ path: 'companies/:companyId', component: CompanyComponent }])],
      providers: [{ provide: CompaniesService, useClass: CompaniesServiceStub }, { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { companyId: 'company11' };
    fixture.detectChanges();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
