/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyRolesComponent } from './companyroles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';

import { CompaniesService } from '../../companies.service';
import { CompaniesServiceStub } from '../../mock-companies';

describe('CompanyRolesComponent', () => {
  let component: CompanyRolesComponent;
  let fixture: ComponentFixture<CompanyRolesComponent>;
  let activatedRoute: ActivatedRouteStub;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'contacts/:contactId', component: CompanyRolesComponent }])],
      declarations: [CompanyRolesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CompaniesService, useClass: CompaniesServiceStub }, { provide: ActivatedRoute, useClass: ActivatedRouteStub }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRolesComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { contactId: 'company11' };
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
