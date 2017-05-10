/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompanyRoleComponent } from './companyrole.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivatedRouteStub } from 'testing/router-stubs';

import { CompaniesService } from '../../../companies.service';
import { CompaniesServiceStub } from '../../../mock-companies';

describe('CompanyRoleComponent', () => {
  let component: CompanyRoleComponent;
  let fixture: ComponentFixture<CompanyRoleComponent>;
  let activatedRoute: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'contacts/:contactId', component: CompanyRoleComponent }])],
      declarations: [CompanyRoleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CompaniesService, useClass: CompaniesServiceStub }, { provide: ActivatedRoute, useClass: ActivatedRouteStub }]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRoleComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    activatedRoute.testParams = { contactId: 'company11', roleId: '' };
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
